export const getShowValue = (value: string) => {
    if (typeof value === 'string' && value !== '') {
        const showValueList = value.split('\n');
        if (showValueList[showValueList.length - 1] === '') showValueList[showValueList.length - 1] = ' ';
        const showValue = showValueList.join('\n');
        return showValue;
    }
    return '-';
};

export const getEditValue = (value: string) => {
    if (typeof value === 'string' && value !== '') {
        return value;
    }
    return '';
};
