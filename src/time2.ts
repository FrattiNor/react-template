import chalk from 'chalk';
import { gotInstance, transformObjToFormData } from './utils.js';
import dayjs from 'dayjs';

type Time = { year?: number; month?: number };
type Token = { REDSESSIONID: string; staff_id: string };

const recordUrl = 'https://ehr.supcon.com/RedseaPlatform/redmagicapi/rf_s_kq_data_queryByStaffId/redApiExec.mc';
const classesUrl = 'https://ehr.supcon.com/RedseaPlatform/redmagicapi/rf_s_kq_count_SelectStaffIDDaily/redApiExec.mc';
const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const secondToHour = (v: number) => {
    return Number((v / 60 / 60).toFixed(2));
};

const secondToHourMinute = (v: number) => {
    const hourTime = secondToHour(v);
    const hour = Math.floor(hourTime);
    const minute = Math.floor((hourTime - hour) * 60);
    return `${hour}小时${minute}分钟`;
};

export const countTime = async ({ REDSESSIONID, staff_id }: Token, time?: Time) => {
    try {
        const { year: _year, month: _month } = time || {};
        const currentYear = dayjs().get('year');
        if (typeof _year === 'number' && (_year > currentYear || _year < 2000)) {
            console.log(`${1999} < year <= ${currentYear}`);
            return;
        }
        if (typeof _month === 'number' && (_month < 1 || _month > 12)) {
            console.log(`1 <= month <= 12`);
            return;
        }
        const year = _year || currentYear;
        const month = _month ? _month - 1 : dayjs().get('month'); // start 0
        const currentMonth = dayjs().set('year', year).set('month', month);
        const maxDay = currentMonth.endOf('month').get('date');
        const minDay = currentMonth.startOf('month').get('date');

        let normalTotalTime = 0;
        let holidayTotalTime = 0;

        for (let i = minDay; i <= maxDay; i++) {
            const currentDay = currentMonth.clone().set('date', i);
            const dayStr = currentDay.format('YYYY-MM-DD');
            const weekStr = weekDay[currentDay.get('day')];

            const recordBody = {
                bc_date: dayStr,
                bc_date_end: dayStr,
                start: 0,
                pageSize: 999,
            };

            const headers = {
                Cookie: `REDSESSIONID=${REDSESSIONID};`,
            };

            const recordReq = await gotInstance(recordUrl, {
                headers,
                method: 'POST',
                responseType: 'json',
                body: transformObjToFormData(recordBody),
            });

            const classesBody = {
                staff_id,
                work_day: dayStr,
            };

            const classesReq = await gotInstance(classesUrl, {
                headers,
                method: 'POST',
                responseType: 'json',
                body: transformObjToFormData(classesBody),
            });

            // kq_status_total
            // 0：休息 1：正常
            const dayType = (classesReq.body as any)?.data?.[0]?.kq_status_total;
            const dayTypeStr = dayType === '1' ? '工作日' : dayType === '0' ? '节假日' : '未  知';
            const dayColor = dayType === '1' ? chalk.hex('#1677ff') : dayType === '0' ? chalk.hex('#52c41a') : chalk.hex('#8c8c8c');
            const isOutWork = (classesReq.body as any)?.data?.[0]?.abnormal_name === '出差';
            const allRecord = (recordReq.body as any)?.data?.list?.map((item: any) => dayjs(item?.kq_time, 'YYYY-MM-DD HH:mm:ss').unix());

            // 非出差
            if (!isOutWork) {
                // 打卡结束时间（格式化）
                let end = null;
                // 打卡开始时间（格式化）
                let start = null;
                // 加班时间（秒）
                let addTime = null;

                // 打卡记录超过2次
                if (allRecord.length > 1) {
                    // 打卡开始时间（秒时间戳）
                    const min = Math.min(...allRecord);
                    // 打卡结束时间（秒时间戳）
                    const max = Math.max(...allRecord);
                    // 打卡时间间距（秒）
                    const distance = max - min;
                    // 正常上班时间（计算加班额外增加半小时）
                    const normal = (18.5 - 9) * 60 * 60;
                    // 打卡开始时间（格式化）
                    start = dayjs.unix(min).format('HH:mm:ss');
                    // 打卡结束时间（格式化）
                    end = dayjs.unix(max).format('HH:mm:ss');

                    if (dayTypeStr === '工作日') {
                        const _addTime = distance - normal;
                        if (_addTime > 0) {
                            addTime = _addTime;
                            normalTotalTime += addTime;
                        }
                    }

                    if (dayTypeStr === '节假日') {
                        if (distance > 0) {
                            addTime = distance;
                            holidayTotalTime += addTime;
                        }
                    }
                }

                // 打卡记录只有一次
                if (allRecord.length === 1) {
                    start = dayjs(allRecord[0], 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
                }

                const consoleStr1 = `[${dayTypeStr}] [${weekStr}] ${dayStr}`;
                const consoleStr2 = start || end ? ` [${start}, ${end}]` : '';
                const consoleStr3 = addTime ? ` ${secondToHour(addTime)}（${secondToHourMinute(addTime)}）` : '';
                console.log(dayColor(consoleStr1 + consoleStr2 + consoleStr3));
            } else {
                console.log(chalk.hex('#fa8c16')(`[出  差] [${weekStr}] ${dayStr}`));
            }
        }

        const totalColor = chalk.hex('#eb2f96');
        const currentMonthStr = currentMonth.format('YYYY-MM');
        const workDayTotal = `[工作日] ${currentMonthStr} ${secondToHour(normalTotalTime)}（${secondToHourMinute(normalTotalTime)}）`;
        const holidayTotal = `[节假日] ${currentMonthStr} ${secondToHour(holidayTotalTime)}（${secondToHourMinute(holidayTotalTime)}）`;
        console.log(totalColor(workDayTotal));
        console.log(totalColor(holidayTotal));
    } catch (e) {
        console.log('error', e);
    }
};
