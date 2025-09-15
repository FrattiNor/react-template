import { Fragment } from 'react';
import { useTableContext } from '../../../TableContext';

const HeaderHeightRetainer = () => {
	const { tableProps } = useTableContext();
	const { columnGroups, columnsFlat } = tableProps;
	const colCount = columnsFlat.length;
	const rowCount = columnGroups.length + 1;
	const minHeight = tableProps.rowHeight;
	return (
		<Fragment>
			{Array(rowCount)
				.fill('')
				.map((_, index) => (
					<div key={index} style={{ gridRow: `${index + 1}/${index + 2}`, gridColumn: `1/${colCount + 1}`, minHeight }} />
				))}
		</Fragment>
	);
};

export default HeaderHeightRetainer;
