import { useMemo } from 'react';

import { defaultBordered, defaultRowHeight } from '../../TableUtils/configValues';

import type { TableProps } from '../../TableTypes/typeProps';

const useTableRequiredProps = <T>(props: TableProps<T>) => {
	const columnConf = useMemo(
		() => ({
			sortConf: props.columnConf?.sortConf,
			widthConf: props.columnConf?.widthConf,
			visibleConf: props.columnConf?.visibleConf,
		}),
		[props.columnConf?.sortConf, props.columnConf?.widthConf, props.columnConf?.visibleConf],
	);

	const requiredProps: Required<Omit<TableProps<T>, 'columns'>> = {
		data: props.data,
		rowKey: props.rowKey,
		columnConf: columnConf,
		loading: props.loading ?? false,
		bordered: props.bordered ?? defaultBordered,
		rowHeight: props.rowHeight ?? defaultRowHeight,
		onResizeEnd: props.onResizeEnd ?? (() => {}),
	};

	return { ...requiredProps };
};

export default useTableRequiredProps;
