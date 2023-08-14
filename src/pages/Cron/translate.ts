import { cronParser } from './utils';

const translate = (cronExp: string) => {
    if (cronExp === '') {
        return 'cron表达式为空';
    }

    const { error } = cronParser(cronExp);

    if (error) {
        return error;
    }

    const tmpCorns = cronExp.split(' ');

    if (tmpCorns.length == 6 || tmpCorns.length == 7) {
        const sBuffer = [];

        if (tmpCorns.length == 7) {
            // 解析 year
            const year = tmpCorns[6];
            if (year !== '*' && year !== '?') {
                if (year.includes('/')) {
                    sBuffer.push(`从${year.split('/')[0]}年开始每${year.split('/')[1]}年`);
                } else if (year.includes('-')) {
                    sBuffer.push(`${year.split('-')[0]}到${year.split('-')[1]}年`);
                } else {
                    sBuffer.push(`${year}年`);
                }
            }
        }

        // 解析 month
        const month = tmpCorns[4];
        if (month !== '?') {
            if (month.includes('/')) {
                if (sBuffer.length === 0) sBuffer.push(`每年`);
                sBuffer.push(`从${month.split('/')[0]}月开始每${month.split('/')[1]}个月`);
            } else if (month.includes('-')) {
                if (sBuffer.length === 0) sBuffer.push(`每年`);
                sBuffer.push(`${month.split('-')[0]}到${month.split('-')[1]}月`);
            } else if (month === '*') {
                if (sBuffer.length > 0) sBuffer.push('每月');
            } else {
                if (sBuffer.length === 0) sBuffer.push(`每年`);
                sBuffer.push(`${month}月`);
            }
        }

        // 解析 dayofMonth
        const dayofMonth = tmpCorns[3];
        if (dayofMonth !== '?') {
            if (dayofMonth.includes('/')) {
                if (sBuffer.length === 0) sBuffer.push(`每月`);
                sBuffer.push(`从${dayofMonth.split('/')[0]}日开始每${dayofMonth.split('/')[1]}天`);
            } else if (dayofMonth.includes('-')) {
                if (sBuffer.length === 0) sBuffer.push(`每月`);
                sBuffer.push(`${dayofMonth.split('-')[0]}到${dayofMonth.split('-')[1]}日`);
            } else if (dayofMonth === '*') {
                if (sBuffer.length > 0) sBuffer.push('每日');
            } else {
                if (sBuffer.length === 0) sBuffer.push(`每月`);
                sBuffer.push(`每月${dayofMonth}日`);
            }
        }

        // 解析 dayofWeek
        const dayofWeek = tmpCorns[5];
        if (dayofWeek !== '?') {
            if (dayofWeek.includes('/')) {
                sBuffer.push(`每周从周${dayofWeek.split('/')[0]}开始每${dayofWeek.split('/')[1]}天`);
            } else if (dayofWeek.includes('-')) {
                sBuffer.push(`每周周${dayofWeek.split('-')[0]}到周${dayofWeek.split('-')[1]}`);
            } else if (dayofWeek === '*') {
                if (sBuffer.length > 0) sBuffer.push('每日');
            } else {
                sBuffer.push(`每周${dayofWeek}日`);
            }
        }

        // 解析 hour
        const hour = tmpCorns[2];
        if (hour !== '?') {
            if (hour.includes('/')) {
                if (sBuffer.length === 0) sBuffer.push(`每天`);
                sBuffer.push(`从${hour.split('/')[0]}小时开始每${hour.split('/')[1]}小时`);
            } else if (hour.includes('-')) {
                if (sBuffer.length === 0) sBuffer.push(`每天`);
                sBuffer.push(`${hour.split('-')[0]}到${hour.split('-')[1]}小时`);
            } else if (hour === '*') {
                if (sBuffer.length > 0) sBuffer.push('每小时');
            } else {
                if (sBuffer.length === 0) sBuffer.push(`每天`);
                sBuffer.push(`${hour}小时`);
            }
        }

        // 解析 minute
        const minute = tmpCorns[1];
        if (minute !== '?') {
            if (minute.includes('/')) {
                if (sBuffer.length === 0) sBuffer.push(`每小时`);
                sBuffer.push(`从${minute.split('/')[0]}分钟开始每${minute.split('/')[1]}分钟`);
            } else if (minute.includes('-')) {
                if (sBuffer.length === 0) sBuffer.push(`每小时`);
                sBuffer.push(`${minute.split('-')[0]}到${minute.split('-')[1]}分钟`);
            } else if (minute === '*') {
                if (sBuffer.length > 0) sBuffer.push('每分钟');
            } else {
                if (sBuffer.length === 0) sBuffer.push(`每小时`);
                sBuffer.push(`${minute}分钟`);
            }
        }

        // 解析 second
        const second = tmpCorns[0];
        if (second !== '?') {
            if (second.includes('/')) {
                if (sBuffer.length === 0) sBuffer.push(`每分钟`);
                sBuffer.push(`从${second.split('/')[0]}秒开始每${second.split('/')[1]}秒`);
            } else if (second.includes('-')) {
                if (sBuffer.length === 0) sBuffer.push(`每分钟`);
                sBuffer.push(`${second.split('-')[0]}到${second.split('-')[1]}秒每秒`);
            } else if (second === '*') {
                sBuffer.push(`每秒`);
            } else {
                if (sBuffer.length === 0) sBuffer.push(`每分钟`);
                sBuffer.push(`${second}秒`);
            }
        }

        return `${sBuffer.join('，')}执行`;
    }

    return 'cron表达式长度错误';
};

export default translate;
