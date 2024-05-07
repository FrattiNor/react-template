import classNames from 'classnames';

import styles from './index.module.less';

import type { DataSource } from '../../../TableBlock/hooks/useDataSource';
import type { VirtualCore } from '../../../TableBlock/hooks/useVirtual';
import type { TableBlockProps } from '../../../TableBlock/type';

type Props<T> = {
    virtual: VirtualCore<T>;
    props: TableBlockProps<T>;
    dataSource: DataSource<T>;
};

const VirtualBody = <T,>(props: Props<T>) => {
    const { virtual, dataSource, props: tableBlockProps } = props;
    const { renderItem, colCount, rowKey } = tableBlockProps;
    const { verticalVirtualItems, verticalTotalSize, verticalDistance, verticalMeasureElement } = virtual;
    const virtualBodyStyle = { paddingTop: verticalDistance, height: verticalTotalSize };

    return (
        <div className={styles['virtual-body']} style={virtualBodyStyle}>
            {verticalVirtualItems.map((verticalItem) => {
                const currentRowIndex = verticalItem?.index;
                if (typeof currentRowIndex === 'number') {
                    const measureProps = { ['data-index']: currentRowIndex, ref: verticalMeasureElement };
                    const rowStartIndex = colCount * currentRowIndex;
                    const rowIndexs = Array(colCount)
                        .fill('')
                        .map((_, i) => i + rowStartIndex);

                    return (
                        <div {...measureProps} key={currentRowIndex} className={classNames(styles['body-row'])}>
                            {rowIndexs.map((index) => {
                                const currentData = dataSource[index];
                                if (currentData) {
                                    const key = (typeof rowKey === 'function' ? rowKey(currentData) : currentData[rowKey]) as string;

                                    return (
                                        <div key={key} className={styles['body-cell']}>
                                            {renderItem(currentData, index)}
                                        </div>
                                    );
                                }
                                return <div key={`index_${index}`} className={styles['body-cell']} />;
                            })}
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default VirtualBody;
