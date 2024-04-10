import type { FC } from 'react';

import BodyRow from './BodyRow';
import styles from './index.module.less';
import { useTableContext } from '../../../TableContext';
import type { AnyObj } from '../../../type';

const VirtualBody: FC = <T extends AnyObj>() => {
    const tableContext = useTableContext<T>();
    const { rowKey } = tableContext.handledProps;

    const { verticalVirtualItems, verticalTotalSize, verticalDistance, horizontalTotalSize, showDataSource } = tableContext;
    const virtualBodyStyle = { paddingTop: verticalDistance, height: verticalTotalSize };

    return (
        <div className={styles['virtual-body']} style={{ width: horizontalTotalSize, ...virtualBodyStyle }}>
            {verticalVirtualItems.map((verticalItem) => {
                const currentRowIndex = verticalItem.index;
                const currentRowData = showDataSource?.[currentRowIndex];
                if (currentRowData) {
                    const currentRowKey = typeof rowKey === 'function' ? rowKey(currentRowData) : currentRowData[rowKey];
                    return (
                        <BodyRow
                            measure
                            key={currentRowKey}
                            currentRowKey={currentRowKey}
                            currentRowData={currentRowData}
                            currentRowIndex={currentRowIndex}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
};

export default VirtualBody;
