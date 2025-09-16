import { memo } from 'react';
import type { TableInstance } from '../../../TableHooks/type';
import type { TableDataItem } from '../../../TableTypes/type';
import { FixedTwo } from '../../../TableUtils';

import styles from './index.module.less';
import propsAreEqual from './propsAreEqual';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const MeasureColumnSize = <T extends TableDataItem>({ instance }: Props<T>) => {
	const { columnsFlat } = instance.tableProps;
	const { setColumnSizes } = instance.tableState;
	const { setNeedMeasure, getMeasureStyle } = instance.tableMeasureCol;

	const initColWidth = (node: HTMLDivElement | null, key: string, isLast: boolean) => {
		if (node !== null) {
			setColumnSizes((old) => {
				if (typeof old[key] !== 'number') {
					return { ...old, [key]: FixedTwo(node.getBoundingClientRect().width) };
				}
				return old;
			});
			if (isLast === true) {
				setNeedMeasure(false);
			}
		}
	};

	return (
		<div className={styles['measure']}>
			{columnsFlat.map(({ key }, colIndex) => {
				const isLast = colIndex === columnsFlat.length - 1;
				return <div key={key} ref={(node) => initColWidth(node, key, isLast)} className={styles['measure-cell']} style={getMeasureStyle({ colIndex })} />;
			})}
		</div>
	);
};

export default memo(MeasureColumnSize, propsAreEqual) as typeof MeasureColumnSize;
