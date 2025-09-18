import styles from './index.module.less';
import type { TableInstance } from '../../../TableTypes/typeHooks';
import type { TableDataItem } from '../../../TableTypes/type';
import { memo } from 'react';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const HeadCellPlaceholder = <T extends TableDataItem>(props: Props<T>) => {
	const { rowIndex } = getProps(props);
	const { columnsFlat } = getInstanceProps(props);
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

export default memo(HeadCellPlaceholder, propsAreEqual) as typeof HeadCellPlaceholder;
