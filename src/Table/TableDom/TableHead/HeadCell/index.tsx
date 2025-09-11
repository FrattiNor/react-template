import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../../TableContext';
import ResizeHandle from '../ResizeHandle';
import classNames from 'classnames';
import HeadCellRender from './CellRender';

type Props = {
	rowIndex: number;
	colIndex: number;
};

const HeadCell: FC<Props> = ({ rowIndex, colIndex }) => {
	const { tableProps, tableCellBg, tableSticky } = useTableContext();
	const { columnsFlat, bordered } = tableProps;
	const column = columnsFlat[colIndex];
	const headCellBg = tableCellBg.getHeadCellBg({ colKey: column.key });
	const { stickyStyle, stickyClassName } = tableSticky.getStickyStyleAndClassName({ colKey: column.key, type: 'head' });

	return (
		<div
			key={column.key}
			className={classNames(styles['head-cell'], stickyClassName, { [styles['bordered']]: bordered })}
			style={{
				backgroundColor: headCellBg,
				gridRow: `${rowIndex + 1}/${rowIndex + 2}`,
				gridColumn: `${colIndex + 1}/${colIndex + 2}`,
				...stickyStyle,
			}}
		>
			<HeadCellRender colIndex={colIndex} />
			<ResizeHandle colKey={column.key} />
		</div>
	);
};

export default HeadCell;
