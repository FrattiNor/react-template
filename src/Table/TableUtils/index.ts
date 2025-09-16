/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import type { TableInstance } from '../TableHooks/type';
import type { TableDataItem } from '../TableTypes/type';

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

export const getJudgeEachInstanceObj = (list: Array<(instance: Readonly<TableInstance<TableDataItem>>) => any>) => {
	const obj: Record<string, (instance: Readonly<TableInstance<TableDataItem>>) => any> = {};
	list.forEach((fun) => {
		const str = String(fun);
		const key = /instance\.(.*)/.exec(str)?.[1];
		if (!key) throw new Error('get key error');
		obj[key] = fun;
	});
	return obj;
};
