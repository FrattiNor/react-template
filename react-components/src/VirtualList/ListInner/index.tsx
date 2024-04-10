import type { FC } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import Empty from '../../Empty';
import Highlight from '../../Highlight';
import type { HandledDataItem, VirtualListInstance, VirtualListProps } from '../type';

type Props = VirtualListProps<any> & {
    instance: VirtualListInstance<any>;
};

const ListInner: FC<Props> = (props) => {
    const { renderItem, data, listClassName, listStyle, instance } = props;
    const { virtual, virtualWrapperRef, lineHeight, isEmpty, selectedKey, setSelectedKey, getKeyLabelDisabled, keyword } = instance;
    const { virtualItems, totalSize, measureElement, distance } = virtual;

    return (
        <div ref={virtualWrapperRef} className={classNames(styles['list'], listClassName)} style={listStyle}>
            {isEmpty && (
                <div className={styles['empty']}>
                    <Empty />
                </div>
            )}

            {!isEmpty && (
                <div className={styles['virtual-list']} style={{ height: totalSize, paddingTop: distance }}>
                    {virtualItems.map((verticalItem) => {
                        const currentRowIndex = verticalItem.index;
                        const currentRowData = data?.[currentRowIndex];

                        if (currentRowData) {
                            const { key, label, disabled } = getKeyLabelDisabled(currentRowData);
                            const handleData: HandledDataItem<any> = { data: currentRowData, key, label, disabled };
                            const selected = selectedKey === key;

                            return (
                                <div
                                    key={key}
                                    ref={measureElement}
                                    data-index={currentRowIndex}
                                    className={styles['list-row']}
                                    style={{ minHeight: lineHeight }}
                                >
                                    <div
                                        style={{ minHeight: lineHeight }}
                                        onClick={() => setSelectedKey(selected ? undefined : key, currentRowData)}
                                        className={classNames(styles['label-select-content'], { [styles['selected']]: selected })}
                                    >
                                        <div className={styles['label']}>
                                            {renderItem ? (
                                                renderItem(currentRowData, handleData, keyword)
                                            ) : (
                                                <Highlight keyword={keyword}>{label}</Highlight>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
};

export default ListInner;
