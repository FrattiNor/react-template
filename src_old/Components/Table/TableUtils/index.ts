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

export const getPropsAreEqual =
	<T>({ getProps, getTotalInstanceProps }: { getProps?: (p: T) => Record<string, any>; getTotalInstanceProps?: (p: T) => Record<string, any> }) =>
	(prevProps: T, nextProps: T): boolean => {
		if (getProps) {
			const prevPropsProps = getProps(prevProps);
			const nextPropsProps = getProps(nextProps);
			const propsKeys = Object.keys(prevPropsProps) as Array<keyof ReturnType<typeof getProps>>;
			for (let i = 0; i < propsKeys.length; i++) {
				const key = propsKeys[i];
				if (prevPropsProps[key] !== nextPropsProps[key]) {
					return false;
				}
			}
		}

		if (getTotalInstanceProps) {
			const prevInstanceProps = getTotalInstanceProps(prevProps);
			const nextInstanceProps = getTotalInstanceProps(nextProps);
			const instancePropsKeys = Object.keys(prevInstanceProps) as Array<keyof ReturnType<typeof getTotalInstanceProps>>;
			for (let i = 0; i < instancePropsKeys.length; i++) {
				const key = instancePropsKeys[i];
				if (prevInstanceProps[key] !== nextInstanceProps[key]) {
					return false;
				}
			}
		}

		return true;
	};
