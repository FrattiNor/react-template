import type { Props } from './index';

const judgeEach = [
	//
	(props: Readonly<Props>) => props.column,
	(props: Readonly<Props>) => props.align,
];

const propsAreEqual = (prevProps: Readonly<Props>, nextProps: Readonly<Props>): boolean => {
	for (let i = 0; i < judgeEach.length; i++) {
		const fun = judgeEach[i];
		if (fun(prevProps) !== fun(nextProps)) {
			return false;
		}
	}

	return true;
};

export default propsAreEqual;
