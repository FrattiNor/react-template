import { memo } from 'react';

import BodyInner from './BodyInner';
import styles from './index.module.less';
import MeasureCol from './MeasureCol';
import StickyObserver from './StickyObserver';

import type { TableInstance } from '../../useTableInstance';

type Props<T> = Required<
	Pick<
		TableInstance<T>,
		| 'splitColumnsArr'
		| 'splitColumnsArr_01'
		| 'bordered'
		| 'data'
		| 'rowKey'
		| 'gridTemplateColumns'
		| 'bodyRef'
		| 'bodyInnerRef'
		| 'rowHeight'
		| 'getStickyStyle'
		| 'setSizeCacheMap'
		| 'setPingedObj'
		| 'fixedLeftObj'
		| 'fixedRightObj'
		| 'getBodyCellBg'
		| 'sizeCacheMap'
		| 'resized'
		| 'resizeFlag'
		| 'bodyWidth'
	>
>;

const TableBody = <T,>(props: Props<T>) => {
	const { bodyRef } = props;

	return (
		<div ref={bodyRef} className={styles['body']}>
			{/* 监测col宽度 */}
			<MeasureCol
				resized={props.resized}
				resizeFlag={props.resizeFlag}
				sizeCacheMap={props.sizeCacheMap}
				setSizeCacheMap={props.setSizeCacheMap}
				splitColumnsArr_01={props.splitColumnsArr_01}
			/>
			{/* 监测fixed状态 */}
			<StickyObserver
				bodyRef={props.bodyRef}
				setPingedObj={props.setPingedObj}
				fixedLeftObj={props.fixedLeftObj}
				fixedRightObj={props.fixedRightObj}
				splitColumnsArr={props.splitColumnsArr}
				gridTemplateColumns={props.gridTemplateColumns}
			/>
			<BodyInner
				data={props.data}
				rowKey={props.rowKey}
				bordered={props.bordered}
				rowHeight={props.rowHeight}
				bodyWidth={props.bodyWidth}
				bodyInnerRef={props.bodyInnerRef}
				getBodyCellBg={props.getBodyCellBg}
				getStickyStyle={props.getStickyStyle}
				splitColumnsArr={props.splitColumnsArr}
				gridTemplateColumns={props.gridTemplateColumns}
			/>
		</div>
	);
};

export default memo(TableBody) as typeof TableBody;
