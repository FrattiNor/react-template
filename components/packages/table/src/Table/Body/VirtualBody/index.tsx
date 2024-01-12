import { useTableContext } from '../../../TableContext';
import styles from './index.module.less';
import { AnyObj } from '../../../type';
import BodyRow from './BodyRow';
import { FC } from 'react';

const VirtualBody: FC = <T extends AnyObj>() => {
    const tableContext = useTableContext<T>();
    const { virtual = 'both', rowKey } = tableContext.props;
    const { verticalVirtualItems, verticalTotalSize, verticalDistance, horizontalTotalSize, showDataSource } = tableContext;

    return (
        <div className={styles['virtual-body']} style={{ height: verticalTotalSize, width: horizontalTotalSize, paddingTop: verticalDistance }}>
            {virtual === 'both' || virtual === 'vertical'
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
