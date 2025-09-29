import { useMemo } from 'react';

import { type useTableTools_1 } from '../useTableTools';

import type { TableDataItem } from '../../TableTypes/type';
import type { TableProps } from '../../TableTypes/typeProps';
import type useTableProps from '../useTableProps';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableTools_1: ReturnType<typeof useTableTools_1<T>>;
};

// data处理
const useTableData = <T extends TableDataItem>({ tableProps, tableTools_1 }: Props<T>) => {
	// 内部使用，使用断言赋予类别
	const { data } = tableProps as unknown as TableProps<T>;
	const { getRowKey } = tableTools_1;

	const { dataKeys, dataKeysObj } = useMemo(() => {
		const dataKeys: string[] = [];
		const dataKeysObj: Record<string, true> = {};
		data?.forEach((item, index) => {
			const rowKey = getRowKey(item, index);
			dataKeys.push(rowKey);
			dataKeysObj[rowKey] = true;
		});
		return { dataKeys, dataKeysObj };
	}, [data, getRowKey]);

	const datasource = useMemo(() => data ?? [], [data]);

	return { dataKeys, dataKeysObj, datasource };
};

export default useTableData;
