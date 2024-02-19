/* eslint-disable react-refresh/only-export-components */
import { FC } from 'react';

import Checkbox from '@pkg/checkbox';
import Empty from '@pkg/empty';
import Loading from '@pkg/loading';
import { useTheme } from '@pkg/theme';
import classNames from 'classnames';

import styles from './index.module.less';
import { VirtualListContextHoc, useVirtualListContext } from '../ListContext';
import { HandledDataItem } from '../type';

const Tree: FC = () => {
    const contextData = useVirtualListContext();
    const { virtual, props, wrapperRef } = contextData;
    const { themeClassName, applyTheme } = useTheme();
    const { virtualItems, totalSize, measureElement, distance } = virtual;
    const { renderItem, loading, style, className, wrapperClassName, wrapperStyle, select, data } = props;
    const { lineHeight, isEmpty, selectedKeysObj, setSelectedKeysObj, getKeyLabelDisabled } = contextData;

    return (
        <div className={classNames(styles['wrapper'], themeClassName, applyTheme, wrapperClassName)} style={wrapperStyle}>
            <Loading loading={loading} />

            <div ref={wrapperRef} className={classNames(styles['list'], className)} style={style}>
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
                                const selected = selectedKeysObj[key];

                                const handleData: HandledDataItem<any> = {
                                    data: currentRowData,
                                    key,
                                    label,
                                    disabled,
                                };

                                return (
                                    <div
                                        key={key}
                                        ref={measureElement}
                                        data-index={currentRowIndex}
                                        className={styles['list-row']}
                                        style={{ minHeight: lineHeight }}
                                    >
                                        {select === 'checkbox' && (
                                            <div
                                                style={{ minHeight: lineHeight }}
                                                className={styles['checkbox-select-content']}
                                                onClick={() => setSelectedKeysObj({ [key]: !selected })}
                                            >
                                                <Checkbox className={styles['checkbox']} checked={selected} />
                                                <div className={styles['label']}>{renderItem ? renderItem(currentRowData, handleData) : label}</div>
                                            </div>
                                        )}

                                        {select === 'label' && (
                                            <div
                                                style={{ minHeight: lineHeight }}
                                                onClick={() => setSelectedKeysObj({ [key]: !selected })}
                                                className={classNames(styles['label-select-content'], { [styles['selected']]: selected })}
                                            >
                                                <div className={styles['label']}>{renderItem ? renderItem(currentRowData, handleData) : label}</div>
                                            </div>
                                        )}

                                        {select !== 'checkbox' && select !== 'label' && (
                                            <div className={styles['content']}>{renderItem ? renderItem(currentRowData, handleData) : label}</div>
                                        )}
                                    </div>
                                );
                            }
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VirtualListContextHoc(Tree);
