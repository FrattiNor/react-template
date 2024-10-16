export const arrayToStr = (record: Record<string, any>): Record<string, any> => {
	const nextRecord: Record<string, any> = { ...record };

	Object.entries(record).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			nextRecord[key] = value.join(',');
		}
	});

	return nextRecord;
};

export const arrayToStrOnly = (record: Record<string, any>, keys: string[]): Record<string, any> => {
	const nextRecord: Record<string, any> = { ...record };

	keys.forEach((key) => {
		const value = nextRecord[key];
		if (Array.isArray(value) && value.length > 0) {
			nextRecord[key] = value.join(',');
		}
	});

	return nextRecord;
};
