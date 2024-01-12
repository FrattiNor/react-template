import { useTableContext } from '../../../TableContext';
import styles from './index.module.less';
import { AnyObj } from '../../../type';
import BodyRow from './BodyRow';
import { FC } from 'react';

const VirtualBody: FC = <T extends AnyObj>() => {
    const tableContext = useTableContext<T>();
    const { virtual = true, rowKey } = tableContext.props;
    const { verticalVirtualItems, verticalTotalSize, verticalDistance, horizontalTotalSize, showDataSource } = tableContext;
    const virtualBodyStyle = virtual === true || virtual === 'vertical' ? { paddingTop: verticalDistance, height: verticalTotalSize } : {};

    return (
        <div className={styles['virtual-body']} style={{ width: horizontalTotalSize, ...virtualBodyStyle }}>
            {virtual === true || virtual === 'vertical'
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
