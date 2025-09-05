import { useMemo } from 'react';
import type { TableDataItem, TableProps } from '../TableTypes/type';

type Props<T extends TableDataItem> = {
	props: TableProps<T>;
};

// table props处理
const useTableProps = <T extends TableDataItem>({ props }: Props<T>) => {
	const columnsKeys = useMemo(() => {
		let keys = '';
		props.columns.forEach((item) => {
			keys += item.key;
		});
		return keys;
	}, [props.columns]);

	return {
		...props,
		columnsKeys,
	};
};

export default useTableProps;
