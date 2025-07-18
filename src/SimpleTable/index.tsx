/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Columns } from './type_column';

type Props<T extends Record<string, any>> = {
	data: T;
	rowKey: keyof T | ((item: T, index: number) => string);
	columns: Columns<T>;
};

const SimpleTable = <T extends Record<string, any>>(props: Props<T>) => {
	console.log(props);
	return <div></div>;
};

export default SimpleTable;
