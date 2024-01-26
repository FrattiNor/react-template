import { isDayjs, isNumber, isString } from '../valueType';
import dayjs, { Dayjs } from 'dayjs';
import { isDate } from 'util/types';

const defaultFormat = 'YYYY-MM-DD HH:mm:ss';

function toTimestamp(str: string, format?: string): number;
function toTimestamp(day: Dayjs): number;
function toTimestamp(date: Date): number;
function toTimestamp(arg1: string | Dayjs | Date, arg2?: string): number {
    if (isString(arg1)) {
        return dayjs(arg1, arg2 || defaultFormat).valueOf();
    } else if (isDate(arg1)) {
        return dayjs(arg1).valueOf();
    } else if (isDayjs(arg1)) {
        return arg1.valueOf();
    }
    return 0;
}

function toStr(timestamp: string | number, format?: string): string;
function toStr(day: Dayjs, format?: string): string;
function toStr(date: Date, format?: string): string;
function toStr(arg1: string | number | Dayjs | Date, arg2?: string): string {
    if (isString(arg1) || isNumber(arg1)) {
        return dayjs(Number(arg1)).format(arg2 || defaultFormat);
    } else if (isDate(arg1)) {
        return dayjs(arg1).format(arg2 || defaultFormat);
    } else if (isDayjs(arg1)) {
        return dayjs(arg1).format(arg2 || defaultFormat);
    }
    return '';
}

function toDayjs(timestamp: number): Dayjs;
function toDayjs(str: string, format?: string): Dayjs;
function toDayjs(date: Date): Dayjs;
function toDayjs(arg1: string | number | Date, arg2?: string): Dayjs {
    if (isString(arg1)) {
        return dayjs(arg1, arg2 || defaultFormat);
    } else if (isNumber(arg1)) {
        return dayjs(arg1);
    } else if (isDate(arg1)) {
        return dayjs(arg1);
    }
    return dayjs();
}

function toDate(timestamp: number): Date;
function toDate(str: string, format?: string): Date;
function toDate(day: Dayjs): Date;
function toDate(arg1: string | number | Dayjs, arg2?: string): Date {
    if (isString(arg1)) {
        return new Date(dayjs(arg1, arg2 || defaultFormat).valueOf());
    } else if (isNumber(arg1)) {
        return new Date(dayjs(arg1).valueOf());
    } else if (isDayjs(arg1)) {
        return new Date(arg1.valueOf());
    }
    return new Date();
}

// .unix() 秒数
// .valueOf() 毫秒数
// 这里使用的全是毫秒数
const timeTool = {
    toStr,
    toDate,
    toDayjs,
    toTimestamp,
};

export default timeTool;
