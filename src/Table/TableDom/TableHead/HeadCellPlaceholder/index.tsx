import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../../TableContext';

type Props = {
	rowIndex: number;
};

const HeadCellPlaceholder: FC<Props> = ({ rowIndex }) => {
	const { tableProps } = useTableContext();
	const { columnsFlat } = tableProps;
	const colMaxIndex = columnsFlat.length - 1;

	return (
		<div
			className={styles['head-cell-placeholder']}
			style={{
				gridRow: `${1}/${rowIndex + 2}`,
				gridColumn: `${colMaxIndex + 2}/${colMaxIndex + 3}`,
			}}
		/>
	);
};

export default HeadCellPlaceholder;
