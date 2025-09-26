import { memo } from 'react';

import BodyRowDraggable from './BodyRowDraggable';
import DragContext from './DragContext';
import DragOverlay from './DragOverlay';
import styles from './index.module.less';
import propsAreEqual, { getInstanceProps } from './propsAreEqual';
import BodyEmpty from '../TableBodyGeneral/BodyEmpty';
import MeasureColumnSize from '../TableBodyGeneral/MeasureColumnSize';

import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const TableBodyDraggable = <T extends TableDataItem>(props: Props<T>) => {
	const { datasource, bodyRef, colMeasure, getRowKey, VV_wrapperStyle, showRowIndexs, gridTemplateColumnsArr } = getInstanceProps(props);
	const gridTemplateColumns = gridTemplateColumnsArr.join(' ');
	const notEmpty = Array.isArray(datasource) && datasource.length > 0;

	return (
		<div className={styles['body']} ref={bodyRef}>
			{colMeasure.measure && <MeasureColumnSize instance={props.instance} />}
			{!notEmpty && <BodyEmpty instance={props.instance} />}
			{notEmpty && (
				<DragContext instance={props.instance}>
					<div className={styles['body-inner']} style={{ gridTemplateColumns, ...VV_wrapperStyle }}>
						{showRowIndexs.map(({ index: rowIndex }) => {
							const rowData = datasource[rowIndex];
							const rowKey = getRowKey(rowData, rowIndex);
							return <BodyRowDraggable key={rowKey} rowIndex={rowIndex} instance={props.instance} />;
						})}
					</div>
					<DragOverlay instance={props.instance} />
				</DragContext>
			)}
		</div>
	);
};

export default memo(TableBodyDraggable, propsAreEqual) as typeof TableBodyDraggable;
