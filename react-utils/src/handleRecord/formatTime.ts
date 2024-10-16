import { type FormatTime } from './type';
import timeTool from '../timeTool';

export const handleFormatTime = (record: Record<string, any>, formatTime: FormatTime): Record<string, any> => {
	const nextRecord: Record<string, any> = { ...record };

	Object.entries(record).forEach(([key, value]) => {
		if (timeTool.isDayjs(value) || timeTool.isDate(value)) {
			switch (formatTime) {
				case 'YYYY-MM-DD HH:mm:ss':
					nextRecord[key] = timeTool.toStr(value as Date, 'YYYY-MM-DD HH:mm:ss');
					break;
				case 'YYYY-MM-DD':
					nextRecord[key] = timeTool.toStr(value as Date, 'YYYY-MM-DD');
					break;
				case 'timestamp':
					nextRecord[key] = timeTool.toTimestamp(value as Date);
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
		if (timeTool.isDayjs(value) || timeTool.isDate(value)) {
			switch (formatTime) {
				case 'YYYY-MM-DD HH:mm:ss':
					nextRecord[key] = timeTool.toStr(value as Date, 'YYYY-MM-DD HH:mm:ss');
					break;
				case 'YYYY-MM-DD':
					nextRecord[key] = timeTool.toStr(value as Date, 'YYYY-MM-DD');
					break;
				case 'timestamp':
					nextRecord[key] = timeTool.toTimestamp(value as Date);
					break;
			}
		}
	});

	return nextRecord;
};
