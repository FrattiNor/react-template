import { useMemo } from 'react';

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
		rowHeight: props.rowHeight ?? 46,
		bordered: props.bordered ?? false,
	};

	return { ...requiredProps };
};

export default useTableRequiredProps;
