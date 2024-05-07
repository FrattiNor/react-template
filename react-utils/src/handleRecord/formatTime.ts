import timeTool from '../timeTool';

import type { FormatTime } from './type';

export const handleFormatTime = (record: Record<string, any>, formatTime: FormatTime): Record<string, any> => {
    const nextRecord: Record<string, any> = { ...record };

    Object.entries(record).forEach(([key, value]) => {
        if (timeTool.isDayjs(value)) {
            switch (formatTime) {
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

export const handleFormatTimeOnly = (record: Record<string, any>, formatObj: Record<string, FormatTime>): Record<string, any> => {
    const nextRecord: Record<string, any> = { ...record };

    Object.entries(formatObj).forEach(([key, formatTime]) => {
        const value = nextRecord[key];
        if (timeTool.isDayjs(value)) {
            switch (formatTime) {
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
