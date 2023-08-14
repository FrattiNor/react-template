import { DayType, RadioType, PeriodType, LoopType, PointType } from './type';

export const getNumByStr = (v: string) => {
    const n = Number(v);
    return isNaN(n) ? 0 : n;
};

// cron 类型
export const cronType = ['second', 'minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek', 'year'] as const;

// cron
export const cronParser = (v: string) => {
    //
    let nextDayType: DayType = 'dayOfMonth';
    // 单选按钮
    const nextRadio = {} as RadioType;
    // 周期数组范围回显
    const nextPeriod = {} as PeriodType;
    // 从...开始
    const nextLoop = {} as LoopType;
    // 指定
    const nextPoint = {} as PointType;

    try {
        // 拆分表达式
        const cronList = v.split(' ');

        if (cronList.length !== 7) {
            return { error: 'Cron表达式长度错误' };
        }

        if (cronList[3] === '?' && cronList[5] === '?') {
            return { error: 'Cron表达式格式错误' };
        }

        if (cronList[3] !== '?' && cronList[5] !== '?') {
            return { error: 'Cron表达式格式错误' };
        }

        if (cronList[3] === '?' && cronList[5] !== '?') {
            nextDayType = 'dayOfWeek';
        }

        if (cronList[3] !== '?' && cronList[5] === '?') {
            nextDayType = 'dayOfMonth';
        }

        for (let i = 0; i < cronList.length; i++) {
            const type = cronType[i];
            const text = cronList[i];

            // ?
            if (/^\?$/.test(text)) {
                // empty
                // *
            } else if (/^\*$/.test(text)) {
                nextRadio[type] = 1;
                // 1/1
            } else if (/^\d+-\d+$/.test(text)) {
                nextRadio[type] = 2;
                const vList = text.split('-');
                if (vList[0] >= vList[1]) return { error: 'Cron表达式格式错误' };
                nextLoop[type] = { start: getNumByStr(vList[0]), loop: getNumByStr(vList[1]) };
                // 1,2
            } else if (/^\d+\/\d+$/.test(text)) {
                nextRadio[type] = 3;
                const vList = text.split('/');
                nextPeriod[type] = { start: getNumByStr(vList[0]), end: getNumByStr(vList[1]) };
                // 1-2
            } else if (/^\d+(,\d+)*$/.test(text)) {
                nextRadio[type] = 4;
                nextPoint[type] = text.split(',').map((item) => Number(item));
                // 格式不正确
            } else {
                return { error: 'Cron表达式格式错误' };
            }
        }
    } catch (e) {
        return { error: 'Cron表达式格式错误' };
    }

    return {
        nextDayType,
        nextLoop,
        nextPeriod,
        nextPoint,
        nextRadio,
    };
};

export const cronStringify = ({
    radioValue,
    periodValue,
    loopValue,
    pointValue,
    dayType,
}: {
    radioValue: RadioType;
    periodValue: PeriodType;
    loopValue: LoopType;
    pointValue: PointType;
    dayType: DayType;
}) => {
    let nextCron = '';
    for (let i = 0; i < cronType.length; i++) {
        const type = cronType[i];
        const beforeEmpty = i !== 0 ? ' ' : '';

        if (dayType === 'dayOfMonth' && i == 5) {
            nextCron += beforeEmpty + '?';
            continue;
        }

        if (dayType === 'dayOfWeek' && i == 3) {
            nextCron += beforeEmpty + '?';
            continue;
        }

        switch (radioValue[type]) {
            case 1:
                nextCron += beforeEmpty + '*';
                break;
            case 2:
                nextCron += beforeEmpty + `${periodValue[type].start}-${periodValue[type].end}`;
                break;
            case 3:
                nextCron += beforeEmpty + `${loopValue[type].start}/${loopValue[type].loop}`;
                break;
            case 4:
                if (pointValue[type].length === 0) {
                    return { error: 'Cron编辑器数据错误' };
                } else {
                    nextCron += beforeEmpty + `${pointValue[type].join(',')}`;
                }
                break;
            default:
                return { error: 'Cron编辑器数据错误' };
        }
    }
    return { nextCron };
};

type Validator<T> = (rule: any, value: T) => Promise<any>;

export const cronValidator: Validator<string> = async (_, cron) => {
    const { error } = cronParser(cron);
    if (error) throw new Error(error);
};
