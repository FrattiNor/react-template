import { useMemo } from 'react';
import type { TableDataItem } from '../TableTypes/type';
import type { TableColumns } from '../TableTypes/type_column';
import { getFlatColumns } from '../utils';

type Props<T extends TableDataItem> = {
	columns: TableColumns<T>;
};

const useTableColumns = <T extends TableDataItem>(props: Props<T>) => {
	const flatColumns = useMemo(() => getFlatColumns(props.columns), [props.columns]);
	return { flatColumns };
};

export default useTableColumns;
