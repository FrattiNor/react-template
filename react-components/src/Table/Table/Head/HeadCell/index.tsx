import { notEmpty } from '@react/utils';
import classNames from 'classnames';

import ResizableTitle from './ResizableTitle';
import useFilter from './useFilter';
import { useTableContext } from '../../../TableContext';
import { type HandledColumn, type AnyObj } from '../../../type';
import getCellTitle from '../../../utils/getCellTitle';
import styles from '../index.module.less';

type Props<T> = {
	rowIndex: number;
	column: HandledColumn<T>;
};

const HeadCell = <T extends AnyObj>(props: Props<T>) => {
	const { column, rowIndex } = props;
	const tableContext = useTableContext();
	const { rowHeight } = tableContext.handledProps;
	const { getStickyStyleClass } = tableContext.columnsGridSizeAndSticky;
	const { resize, title, key, align, filter, onHeadCell, colIndex, underRowSpan } = column;

	const cellValue = notEmpty(title);
	const iStr = typeof cellValue === 'string' || typeof cellValue === 'number';
	const filterDom = useFilter(filter);
	const cellProps = typeof onHeadCell === 'function' ? onHeadCell() : {};
	const cellTitle = cellProps.title ?? getCellTitle(cellValue);
	const cellSticky = getStickyStyleClass(key, 'head');
	const cellStyle = { textAlign: align, gridRow: `${1 + underRowSpan}/${rowIndex + 2}`, gridColumn: colIndex + 1, ...cellSticky.style };

	return (
		<ResizableTitle
			cellKey={key}
			resize={resize}
			title={cellTitle}
			style={cellStyle}
			className={classNames(styles['head-cell'], cellSticky.class)}
		>
			<div className={styles['head-cell-inner']} style={{ minHeight: rowHeight }}>
				<div className={iStr ? styles['head-cell-str'] : styles['head-cell-block']}>{cellValue}</div>
				{filterDom && <div className={styles['head-cell-filter']}>{filterDom}</div>}
			</div>
		</ResizableTitle>
	);
};

export default HeadCell;
