/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const isStrNum = (element: any) => {
	return typeof element === 'string' || typeof element === 'number';
};

export const getCellTitle = (element: any) => {
	if (isStrNum(element)) {
		return element.toString();
	} else if (React.isValidElement(element) && isStrNum((element.props as any).children)) {
		return (element.props as any).children;
	}
	return null;
};

export const FixedTwo = (v: number) => {
	return Number(v.toFixed(2));
};

export const debounce = (fn: () => void, ms: number) => {
	let timeoutId: number;
	return function () {
		window.clearTimeout(timeoutId);
		timeoutId = window.setTimeout(() => fn(), ms);
	};
};
