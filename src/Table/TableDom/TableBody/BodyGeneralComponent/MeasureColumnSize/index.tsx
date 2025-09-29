import { memo } from 'react';

import styles from './index.module.less';
import propsAreEqual, { getInstanceProps } from './propsAreEqual';
import { FixedTwo } from '../../../../TableUtils';

import type { TableDataItem, TableInstance } from '../../../../TableTypes/type';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const MeasureColumnSize = <T extends TableDataItem>(props: Props<T>) => {
	const { setColumnSizes, setColMeasure, getMeasureStyle, columnsFlat } = getInstanceProps(props);

	const initColWidth = (node: HTMLDivElement | null, key: string, isLast: boolean) => {
		if (node !== null) {
			setColumnSizes((old) => {
				return { ...old, [key]: FixedTwo(node.getBoundingClientRect().width) };
			});
			if (isLast === true) {
				setColMeasure({ measure: false, clear: false });
			}
		}
	};

	return (
		<div className={styles['measure']}>
			{columnsFlat.map(({ key }, colIndex) => {
				const isLast = colIndex === columnsFlat.length - 1;
				return (
					<div
						key={key}
						ref={(node) => initColWidth(node, key, isLast)}
						className={styles['measure-cell']}
						style={getMeasureStyle({ colIndex })}
					/>
				);
			})}
		</div>
	);
};

export default memo(MeasureColumnSize, propsAreEqual) as typeof MeasureColumnSize;
