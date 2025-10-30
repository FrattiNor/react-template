import { useMemo } from 'react';

import type { TableProps } from '../../TableTypes/typeProps';

const useTableRequiredProps = <T>(props: TableProps<T>) => {
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

	const columnConf = useMemo(
		() => ({
			orderConf: props.columnConf?.orderConf,
			widthConf: props.columnConf?.widthConf,
			visibleConf: props.columnConf?.visibleConf,
		}),
		[props.columnConf],
	);

	const bordered = useMemo(() => props.bordered ?? false, [props.bordered]);

	const requiredProps: Required<Omit<TableProps<T>, 'columns'>> = {
		data: props.data,
		rowKey: props.rowKey,
		bordered: bordered,
		logRender: logRender,
		columnConf: columnConf,
	};

	return { ...requiredProps };
};

export default useTableRequiredProps;
