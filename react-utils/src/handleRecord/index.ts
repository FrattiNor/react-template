import cleanRecord from '../cleanRecord';
import timeTool from '../timeTool';

const arrayToStr = (record: Record<string, any>, keys: string[]): Record<string, any> => {
    const nextRecord: Record<string, any> = { ...record };

    keys.forEach((key) => {
        const value = nextRecord[key];
        if (Array.isArray(value) && value.length > 0) {
            nextRecord[key] = value.join(',');
        }
    });

    return nextRecord;
};

type FormatTime = {
    [key: string]: 'string' | 'timestamp' | 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD';
};

const handleFormatTime = (record: Record<string, any>, formatTime: FormatTime): Record<string, any> => {
    const nextRecord: Record<string, any> = { ...record };

    Object.entries(formatTime).forEach(([key, format]) => {
        const value = nextRecord[key];
        if (timeTool.isDayjs(value)) {
            switch (format) {
                case 'string':
                case 'YYYY-MM-DD HH:mm:ss':
                    nextRecord[key] = timeTool.toStr(value, 'YYYY-MM-DD HH:mm:ss');
                    break;
                case 'YYYY-MM-DD':
                    nextRecord[key] = timeTool.toStr(value, 'YYYY-MM-DD');
                    break;
                case 'timestamp':
                    nextRecord[key] = timeTool.toTimestamp(value);
                    break;
            }
        }
    });

    return nextRecord;
};

// 总的处理参数的方法
export const handleRecord = (record: Record<string, any>, option?: { clean?: boolean; arrToStr?: string[]; formatTime?: FormatTime }) => {
    const { clean = true, arrToStr, formatTime } = option || {};
    const handledRecord1 = { ...record };
    const handledRecord2 = arrToStr ? arrayToStr(handledRecord1, arrToStr) : handledRecord1;
    const handledRecord3 = formatTime ? handleFormatTime(handledRecord2, formatTime) : handledRecord2;
    const handledRecord4 = clean ? cleanRecord(handledRecord3) : handledRecord3;
    return handledRecord4;
};

export default handleRecord;
