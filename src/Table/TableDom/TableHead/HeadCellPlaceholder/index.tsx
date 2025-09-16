import styles from './index.module.less';
import type { TableInstance } from '../../../TableHooks/type';
import type { TableDataItem } from '../../../TableTypes/type';
import { memo } from 'react';

type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const HeadCellPlaceholder = <T extends TableDataItem>({ instance, rowIndex }: Props<T>) => {
	const { columnsFlat } = instance.tableProps;
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

export default memo(HeadCellPlaceholder) as typeof HeadCellPlaceholder;
