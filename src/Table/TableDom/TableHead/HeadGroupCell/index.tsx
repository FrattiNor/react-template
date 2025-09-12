import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../../TableContext';

import classNames from 'classnames';
import HeadCellRender from '../HeadCellRender';

type Props = {
	rowIndex: number;
	colIndex: number;
};

const HeadGroupCell: FC<Props> = ({ rowIndex, colIndex }) => {
	const { tableProps, tableCellBg, tableSticky } = useTableContext();
	const { columnGroups, bordered } = tableProps;
	const column = columnGroups[rowIndex][colIndex];
	const headCellBg = tableCellBg.getHeadCellBg({ colKey: column.key });
	const { stickyStyle, stickyClassName } = tableSticky.getStickyStyleAndClassName({ colIndexs: [column.startIndex, column.endIndex], type: 'head' });

	return (
		<div
			key={column.key}
			className={classNames(styles['head-group-cell'], stickyClassName, { [styles['bordered']]: bordered, [styles['first-col']]: column.startIndex === 0 })}
			style={{
				backgroundColor: headCellBg,
				gridRow: `${rowIndex + 1}/${rowIndex + 2}`,
				gridColumn: `${column.startIndex + 1}/${column.endIndex + 2}`,
				...stickyStyle,
			}}
		>
			<HeadCellRender title={column.title} align="center" />
		</div>
	);
};

export default HeadGroupCell;
