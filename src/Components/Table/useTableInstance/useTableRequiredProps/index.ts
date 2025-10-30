import { useMemo } from 'react';

import type { TableDataItem } from '../../TableTypes/type';
import type { TableProps } from '../../TableTypes/typeProps';

const useTableRequiredProps = <T extends TableDataItem>(props: TableProps<T>) => {
	const logRender = useMemo(
		() => ({
			table: props.logRender?.table,
			tableDom: props.logRender?.tableDom,
			body: props.logRender?.body,
			bodyRow: props.logRender?.bodyRow,
			bodyCell: props.logRender?.bodyCell,
			head: props.logRender?.head,
			headRow: props.logRender?.headRow,
			headCell: props.logRender?.headCell,
		}),
		[props.logRender],
	);

	const columnsConf = useMemo(
		() => ({
			order: props.columnsConf?.order,
			visible: props.columnsConf?.visible,
			width: props.columnsConf?.width,
		}),
		[props.columnsConf],
	);

	const bordered = useMemo(() => props.bordered ?? false, [props.bordered]);

	const requiredProps: Required<TableProps<T>> = {
		data: props.data,
		rowKey: props.rowKey,
		columns: props.columns,
		bordered: bordered,
		logRender: logRender,
		columnsConf: columnsConf,
	};

	return { ...requiredProps };
};

export default useTableRequiredProps;
