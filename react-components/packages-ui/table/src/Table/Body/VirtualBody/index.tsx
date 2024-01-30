import { FC } from 'react';

import BodyRow from './BodyRow';
import styles from './index.module.less';
import { useTableContext } from '../../../TableContext';
import { AnyObj } from '../../../type';

const VirtualBody: FC = <T extends AnyObj>() => {
    const tableContext = useTableContext<T>();
    const { virtual = true, rowKey } = tableContext.props;
    const virtualV = virtual === true || virtual === 'vertical';
    const { verticalVirtualItems, verticalTotalSize, verticalDistance, horizontalTotalSize, showDataSource } = tableContext;
    const virtualBodyStyle = virtualV ? { paddingTop: verticalDistance, height: verticalTotalSize } : {};

    return (
        <div className={styles['virtual-body']} style={{ width: horizontalTotalSize, ...virtualBodyStyle }}>
            {virtualV
                ? verticalVirtualItems.map((verticalItem) => {
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
                  })
                : showDataSource.map((currentRowData, currentRowIndex) => {
                      const currentRowKey = typeof rowKey === 'function' ? rowKey(currentRowData) : currentRowData[rowKey];
                      return (
                          <BodyRow
                              key={currentRowKey}
                              currentRowKey={currentRowKey}
                              currentRowData={currentRowData}
                              currentRowIndex={currentRowIndex}
                          />
                      );
                  })}
        </div>
    );
};

export default VirtualBody;
