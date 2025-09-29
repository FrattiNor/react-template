import { memo, useLayoutEffect, useRef } from 'react';

import styles from './index.module.less';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';
import BodyCell from '../../../../BodyGeneralComponent/BodyCell';
import BodyCellPlaceholder from '../../../../BodyGeneralComponent/BodyCellPlaceholder';

import type { TableDataItem, TableInstance } from '../../../../../../TableTypes/type';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const BodyRowOverlay = <T extends TableDataItem>(props: Props<T>) => {
	const rowRef = useRef<HTMLDivElement>(null);
	const { rowIndex } = getProps(props);
	const { columnsFlat, bodyGridTemplateColumns, bodyRef } = getInstanceProps(props);

	// 同步row和body的滚动
	useLayoutEffect(() => {
		if (bodyRef.current && rowRef.current) {
			const synchronizedScrolling = () => {
				const bodyScrollLeft = bodyRef.current?.scrollLeft;
				const rowScrollLeft = rowRef.current?.scrollLeft;
				if (typeof bodyScrollLeft === 'number' && typeof rowScrollLeft === 'number' && bodyScrollLeft !== rowScrollLeft) {
					if (rowRef.current) {
						rowRef.current.scrollLeft = bodyScrollLeft;
					}
				}
			};

			synchronizedScrolling();

			bodyRef.current.addEventListener('scroll', synchronizedScrolling, { passive: true });

			return () => {
				bodyRef.current?.removeEventListener('scroll', synchronizedScrolling);
			};
		}
	}, []);

	return (
		<div
			ref={rowRef}
			data-row-index={rowIndex}
			className={styles['body-row']}
			style={{ pointerEvents: 'none', gridTemplateColumns: bodyGridTemplateColumns }}
		>
			{columnsFlat.map((column, colIndex) => {
				return <BodyCell key={column.key} rowIndex={rowIndex} colIndex={colIndex} instance={props.instance} isOverlay />;
			})}
			<BodyCellPlaceholder rowIndex={rowIndex} instance={props.instance} isOverlay />
		</div>
	);
};

export default memo(BodyRowOverlay, propsAreEqual) as typeof BodyRowOverlay;
