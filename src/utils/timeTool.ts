import dayjs, { Dayjs } from 'dayjs';

const defaultFormat = 'YYYY-MM-DD HH:mm:ss';

const isDay = (v: any): v is Dayjs => {
    return typeof v?.isValid === 'function' && v.isValid() === true;
};

const toNumByStr = (s: string, format?: string): number => {
    const d = dayjs(s, format || defaultFormat);
    return isDay(d) ? d.valueOf() : 0;
};

const toNumByDay = (d: Dayjs): number => {
    return isDay(d) ? d.valueOf() : 0;
};

const toNumByDate = (d: Date) => {
    return dayjs(d).valueOf();
};

const toStrByNum = (n: number | string, format?: string): string => {
    const d = dayjs(Number(n));
    return isDay(d) ? d.format(format || defaultFormat) : '-';
};

const toStrByDay = (d: Dayjs, format?: string): string => {
    return isDay(d) ? d.format(format || defaultFormat) : '-';
};

const toStrByDate = (d: Date, format?: string) => {
    return dayjs(d).format(format || defaultFormat);
};

const toDayByNum = (n: number | string): Dayjs => {
    return dayjs(Number(n));
};

const toDayByStr = (s: string, format?: string): Dayjs => {
    return dayjs(s, format || defaultFormat);
};

const toDayByDate = (d: Date) => {
    return dayjs(d);
};

const toDateByDay = (d: Dayjs) => {
    return isDay(d) ? new Date(d.valueOf()) : new Date();
};

const toDateByNum = (n: number | string) => {
    const d = dayjs(Number(n));
    return isDay(d) ? new Date(d.valueOf()) : new Date();
};

const toDateByStr = (s: string, format?: string) => {
    const d = dayjs(s, format || defaultFormat);
    return isDay(d) ? new Date(d.valueOf()) : new Date();
};

// .unix() 秒数
// .valueOf() 毫秒数
// 这里使用的全是毫秒数
const timeTool = {
    toNumByStr,
    toNumByDay,
    toStrByNum,
    toStrByDay,
    toDayByNum,
    toDayByStr,
    toDateByDay,
    toNumByDate,
    toStrByDate,
    toDayByDate,
    toDateByNum,
    toDateByStr,
};

export default timeTool;
