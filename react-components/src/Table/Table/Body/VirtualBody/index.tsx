import { type FC } from 'react';

import BodyRow from './BodyRow';
import { useTableContext } from '../../../TableContext';
import { type AnyObj } from '../../../type';
import styles from '../index.module.less';

const VirtualBody: FC = <T extends AnyObj>() => {
	const tableContext = useTableContext<T>();
	const { dataSource } = tableContext;
	const { rowKey: propsRowKey } = tableContext.handledProps;
	const { verticalTotalSize, verticalDistance, verticalVirtualItems } = tableContext.virtual;
	const { gridTemplateColumns, horizontalTotalSize } = tableContext.columnsGridSizeAndSticky;

	return (
		<div
			className={styles['virtual-body']}
			style={{ width: horizontalTotalSize, height: verticalTotalSize, paddingTop: verticalDistance, gridTemplateColumns }}
		>
			{verticalVirtualItems.map((verticalItem) => {
				const rowIndex = verticalItem?.index;
				const rowData = dataSource.showDataSource?.[rowIndex];
				if (rowData) {
					const rowKey = typeof propsRowKey === 'function' ? propsRowKey(rowData) : rowData[propsRowKey];
					return <BodyRow key={rowKey} rowKey={rowKey} rowData={rowData} rowIndex={rowIndex} />;
				}
			})}
		</div>
	);
};

export default VirtualBody;
