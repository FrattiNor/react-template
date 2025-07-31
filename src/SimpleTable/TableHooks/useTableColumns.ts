import { useMemo } from 'react';
import type { TableDataItem } from '../TableTypes/type';
import type { TableColumns } from '../TableTypes/typeColumn';
import getFlatColumns from '../TableUtils/getFlatColumns';

type Props<T extends TableDataItem> = {
	columns: TableColumns<T>;
};

const useTableColumns = <T extends TableDataItem>(props: Props<T>) => {
	const flatColumns = useMemo(() => getFlatColumns(props.columns), [props.columns]);
	console.log('columns', props.columns);
	console.log('flatColumns', flatColumns);
	return { flatColumns };
};

export default useTableColumns;
