import { memo } from 'react';

import classNames from 'classnames';

import BodyEmpty from './BodyEmpty';
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
	>
>;

const TableBody = <T,>(props: Props<T>) => {
	const { bordered, data, bodyRef, bodyInnerRef } = props;
	const isEmpty = (data ?? []).length === 0;

	return (
		<div ref={bodyRef} className={classNames(styles['body'], { [styles['bordered']]: bordered })}>
			{/* 监测col宽度 */}
			<MeasureCol setSizeCacheMap={props.setSizeCacheMap} splitColumnsArr_01={props.splitColumnsArr_01} />
			{/* 监测fixed状态 */}
			<StickyObserver
				bodyRef={props.bodyRef}
				setPingedObj={props.setPingedObj}
				fixedLeftObj={props.fixedLeftObj}
				fixedRightObj={props.fixedRightObj}
				splitColumnsArr={props.splitColumnsArr}
				gridTemplateColumns={props.gridTemplateColumns}
			/>
			<div ref={bodyInnerRef} className={styles['body-inner']}>
				{/* Body本体 */}
				{!isEmpty && (
					<BodyInner
						data={props.data}
						rowKey={props.rowKey}
						bordered={props.bordered}
						rowHeight={props.rowHeight}
						getStickyStyle={props.getStickyStyle}
						splitColumnsArr={props.splitColumnsArr}
						gridTemplateColumns={props.gridTemplateColumns}
					/>
				)}
				{/* 空Body */}
				{isEmpty && <BodyEmpty />}
			</div>
		</div>
	);
};

export default memo(TableBody) as typeof TableBody;
