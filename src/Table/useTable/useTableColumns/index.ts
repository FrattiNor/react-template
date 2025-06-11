import type { TableColumn, TableColumnGroup, TableColumns, TableProps } from '../../type';

type NewColumn<T> = {
	key: string;
	placeholder: boolean;
	colSpanStart: number;
	colSpanEnd: number;
	headRowSpanStart: number;
	headRowSpanEnd: number;
	originColumn: TableColumn<T> | TableColumnGroup<T>;
};

const useTableColumns = <T>({ columns }: TableProps<T>) => {
	let rowSpanStart = 1;
	const NewColumns: Array<Array<NewColumn<T>>> = [];

	const loopColumns = (data: TableColumns<T>, level: number) => {
		if (NewColumns[level] === undefined) NewColumns[level] = [];

		data.forEach((item) => {
			switch (item.type) {
				case 'column':
					rowSpanStart += 1;
					NewColumns[level].push({
						key: item.key,
						placeholder: false,
						originColumn: item,
						colSpanEnd: rowSpanStart,
						colSpanStart: rowSpanStart,
						headRowSpanEnd: rowSpanStart,
						headRowSpanStart: rowSpanStart,
						// userSelect:
					});
					return;
				case 'columnGroup':
					if (Array.isArray(item.fixed)) loopColumns(item.children, level + 1);
					if (Array.isArray(item.children)) loopColumns(item.children, level + 1);
					return;
				default:
					return;
			}
		});
	};

	loopColumns(columns, 0);
};

export default useTableColumns;
