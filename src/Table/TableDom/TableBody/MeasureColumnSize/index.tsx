import { useTableContext } from '../../../TableContext';
import styles from './index.module.less';

const MeasureInner = () => {
	const { tableProps, tableMeasureCol, tableState } = useTableContext();
	const { columnsFlat } = tableProps;

	const initColWidth = (node: HTMLDivElement | null, key: string) => {
		if (node !== null) {
			tableState.setColumnSizes((old) => {
				if (typeof old[key] !== 'number') {
					return { ...old, [key]: node.clientWidth };
				}
				return old;
			});
		}
	};

	return (
		<div className={styles['measure']}>
			{columnsFlat.map(({ key }, colIndex) => (
				<div key={key} ref={(node) => initColWidth(node, key)} className={styles['measure-cell']} style={tableMeasureCol.getMeasureStyle({ colIndex })} />
			))}
		</div>
	);
};

const MeasureColumnSize = () => {
	const { tableMeasureCol } = useTableContext();
	if (tableMeasureCol.needMeasure) return <MeasureInner />;
	return null;
};

export default MeasureColumnSize;
