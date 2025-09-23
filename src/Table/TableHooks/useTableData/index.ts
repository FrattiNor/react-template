import { useMemo } from 'react';

import type { TableDataItem } from '../../TableTypes/type';
import type useTableProps from '../useTableProps';
import type useTableTools from '../useTableTools';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableTools: ReturnType<typeof useTableTools<T>>;
};

// data处理
const useTableData = <T extends TableDataItem>({ tableProps, tableTools }: Props<T>) => {
	const { data } = tableProps;

	const { dataKeys, dataKeyObj } = useMemo(() => {
		const dataKeys: string[] = [];
		const dataKeyObj: Record<string, true> = {};
		data.forEach((item, index) => {
			const rowKey = tableTools.getRowKey(item, index);
			dataKeys.push(rowKey);
			dataKeyObj[rowKey] = true;
		});
		return { dataKeys, dataKeyObj };
	}, [data]);

	const datasource = data;

	return { dataKeys, dataKeyObj, datasource };
};

export default useTableData;
