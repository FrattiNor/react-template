import { useTableContext } from '../../../TableContext';
import styles from './index.module.less';

const Measure = () => {
	const { props, setWidthSize } = useTableContext();
	const { columns } = props;

	const initColWidth = (node: HTMLDivElement | null, key: string) => {
		if (node !== null) {
			setWidthSize((old) => {
				if (typeof old[key] !== 'number') {
					return { ...old, [key]: node.clientWidth };
				}
				return old;
			});
		}
	};

	return (
		<div className={styles['measure']}>
			{columns.map(({ key, width, flexGrow = 1 }) => (
				<div key={key} className={styles['measure-cell']} ref={(node) => initColWidth(node, key)} style={{ width, flexGrow }} />
			))}
		</div>
	);
};

export default Measure;
