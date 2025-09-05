import { useMemo } from 'react';
import type { TableDataItem, TableProps } from '../TableTypes/type';

type Props<T extends TableDataItem> = {
	props: TableProps<T>;
};

// table props处理
const useTableProps = <T extends TableDataItem>({ props }: Props<T>) => {
	const { columnsKeys, columnsFixedKeys } = useMemo(() => {
		let columnsKeys = '';
		let columnsFixedKeys = '';
		props.columns.forEach((item) => {
			columnsKeys += `_${item.key}`;
			columnsFixedKeys += `_${item.key}&${item.fixed ?? 'default'}`;
		});
		return { columnsKeys, columnsFixedKeys };
	}, [props.columns]);

	return {
		...props,
		columnsKeys,
		columnsFixedKeys,
	};
};

export default useTableProps;
