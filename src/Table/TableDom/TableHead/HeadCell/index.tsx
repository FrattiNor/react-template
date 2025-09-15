import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../../TableContext';
import ResizeHandle from '../ResizeHandle';
import classNames from 'classnames';
import HeadCellRender from '../HeadCellRender';

type Props = {
	rowIndex: number;
	colIndex: number;
};

const HeadCell: FC<Props> = ({ rowIndex, colIndex }) => {
	const { tableProps, tableCellBg, tableSticky, tableVirtual } = useTableContext();
	const { columnsFlat, bordered } = tableProps;
	const column = columnsFlat[colIndex];

	const forceRender = column.forceRender;
	const { stickyStyle, stickyClassName, sticky } = tableSticky.getStickyStyleAndClassName({ colIndexs: [colIndex], type: 'head' });
	const colShow = tableVirtual.getColShow([colIndex]);
	if (!(colShow === true || forceRender === true || sticky === true)) return null;

	const colMaxIndex = columnsFlat.length - 1;
	const headCellBg = tableCellBg.getHeadCellBg({ colKey: column.key });

	return (
		<div
			key={column.key}
			data-col-index={colIndex}
			className={classNames(styles['head-cell'], stickyClassName, { [styles['bordered']]: bordered, [styles['first-col']]: colIndex === 0, [styles['last-col']]: colIndex === colMaxIndex })}
			style={{
				backgroundColor: headCellBg,
				minHeight: tableProps.rowHeight,
				gridRow: `${column.level + 1}/${rowIndex + 2}`,
				gridColumn: `${colIndex + 1}/${colIndex + 2}`,
				...stickyStyle,
			}}
		>
			<HeadCellRender content={column.title} />
			<ResizeHandle colKey={column.key} colIndexs={[colIndex]} />
		</div>
	);
};

export default HeadCell;
