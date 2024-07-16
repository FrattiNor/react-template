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
    const { renderItem, renderPrefix, data, listClassName, listStyle, instance } = props;
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
                        const currentRowIndex = verticalItem?.index;

                        if (typeof currentRowIndex === 'number') {
                            const currentRowData = data?.[currentRowIndex];

                            if (currentRowData) {
                                const { key, label, disabled } = getKeyLabelDisabled(currentRowData);
                                const handleData: HandledDataItem<any> = { data: currentRowData, key, label, disabled, index: currentRowIndex };
                                const selected = selectedKey === key;

                                const onLabelClick = () => {
                                    if (!disabled) {
                                        setSelectedKey(selected ? undefined : key, currentRowData);
                                    }
                                };

                                return (
                                    <div
                                        key={key}
                                        ref={measureElement}
                                        data-index={currentRowIndex}
                                        className={styles['list-row']}
                                        style={{ minHeight: lineHeight }}
                                    >
                                        <div
                                            onClick={onLabelClick}
                                            style={{ minHeight: lineHeight }}
                                            className={classNames(styles['label-select-content'], {
                                                [styles['selected']]: selected,
                                                [styles['not-selected']]: !selected,
                                                [styles['disabled']]: disabled,
                                                [styles['not-disabled']]: !disabled,
                                            })}
                                        >
                                            {renderPrefix && <div className={styles['prefix']}>{renderPrefix(currentRowData)}</div>}
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
                        }
                    })}
                </div>
            )}
        </div>
    );
};

export default ListInner;
