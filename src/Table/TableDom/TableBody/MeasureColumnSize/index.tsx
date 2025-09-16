import { useTableContext } from '../../../TableContext';
import { FixedTwo } from '../../../TableUtils';

import styles from './index.module.less';

const MeasureColumnSize = () => {
	const { tableProps, tableMeasureCol, tableState } = useTableContext();
	const { columnsFlat } = tableProps;

	const initColWidth = (node: HTMLDivElement | null, key: string, isLast: boolean) => {
		if (node !== null) {
			tableState.setColumnSizes((old) => {
				if (typeof old[key] !== 'number') {
					return { ...old, [key]: FixedTwo(node.getBoundingClientRect().width) };
				}
				return old;
			});
			if (isLast === true) {
				tableMeasureCol.setNeedMeasure(false);
			}
		}
	};

	return (
		<div className={styles['measure']}>
			{columnsFlat.map(({ key }, colIndex) => {
				const isLast = colIndex === columnsFlat.length - 1;
				return <div key={key} ref={(node) => initColWidth(node, key, isLast)} className={styles['measure-cell']} style={tableMeasureCol.getMeasureStyle({ colIndex })} />;
			})}
		</div>
	);
};

export default MeasureColumnSize;
