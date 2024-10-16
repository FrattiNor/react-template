export const getShowValue = (value: string | number | null | undefined) => {
	if ((typeof value === 'string' && value !== '') || typeof value === 'number') {
		const showValueList = String(value).split('\n');
		if (showValueList[showValueList.length - 1] === '') showValueList[showValueList.length - 1] = ' ';
		const showValue = showValueList.join('\n');
		return showValue;
	}
	return '-';
};

export const getEditValue = (value: string | number | null | undefined) => {
	if ((typeof value === 'string' && value !== '') || typeof value === 'number') {
		return String(value);
	}
	return '';
};
