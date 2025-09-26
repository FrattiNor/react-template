import { memo } from 'react';

import styles from './index.module.less';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';
import BodyCell from '../../BodyGeneralComponent/BodyCell';
import BodyCellPlaceholder from '../../BodyGeneralComponent/BodyCellPlaceholder';

import type { TableDataItem } from '../../../../TableTypes/type';
import type { TableInstance } from '../../../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const BodyRowOverlay = <T extends TableDataItem>(props: Props<T>) => {
	const { rowIndex } = getProps(props);
	const { columnsFlat, gridTemplateColumnsArr } = getInstanceProps(props);
	const gridTemplateColumns = gridTemplateColumnsArr.join(' ');

	return (
		<div data-index={rowIndex} data-row-index={rowIndex} className={styles['body-row']} style={{ gridTemplateColumns }}>
			{columnsFlat.map((column, colIndex) => {
				return <BodyCell key={column.key} rowIndex={rowIndex} colIndex={colIndex} instance={props.instance} forceRender />;
			})}
			<BodyCellPlaceholder rowIndex={rowIndex} instance={props.instance} />
		</div>
	);
};

export default memo(BodyRowOverlay, propsAreEqual) as typeof BodyRowOverlay;
