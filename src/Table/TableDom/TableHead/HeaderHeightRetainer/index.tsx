import { useTableContext } from '../../../TableContext';

const HeaderHeightRetainer = () => {
	const { tableProps } = useTableContext();
	const { columnGroups, columnsFlat } = tableProps;
	const colCount = columnsFlat.length;
	const rowCount = columnGroups.length + 1;
	const minHeight = tableProps.rowHeight * rowCount;
	return <div style={{ gridRow: `1/${rowCount + 1}`, gridColumn: `1/${colCount + 1}`, minHeight }} />;
};

export default HeaderHeightRetainer;
