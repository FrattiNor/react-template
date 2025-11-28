import { defaultRowHeight } from '../../TableUtils/configValues';

import type { TableProps } from '../../TableTypes/typeProps';

const useTableRequiredProps = <T>(props: TableProps<T>) => {
	const requiredProps: Required<Omit<TableProps<T>, 'columns'>> = {
		data: props.data,
		rowKey: props.rowKey,
		loading: props.loading ?? false,
		bordered: props.bordered ?? true,
		rowHeight: props.rowHeight ?? defaultRowHeight,
		onResizeEnd: props.onResizeEnd ?? (() => {}),
		rowBgHighlight: {
			rowClick: props.rowBgHighlight?.rowClick ?? true,
			rowHover: props.rowBgHighlight?.rowClick ?? true,
			rowSelect: props.rowBgHighlight?.rowClick ?? true,
		},
		columnConf: {
			sortConf: props.columnConf?.sortConf,
			widthConf: props.columnConf?.widthConf,
			visibleConf: props.columnConf?.visibleConf,
		},
	};

	return { ...requiredProps };
};

export default useTableRequiredProps;
