/* eslint-disable react-refresh/only-export-components */
import { FC } from 'react';

import Checkbox from '@pkg/checkbox';
import Empty from '@pkg/empty';
import Loading from '@pkg/loading';
import { useTheme } from '@pkg/theme';
import classNames from 'classnames';

import ArrowSvg from './ArrowSvg';
import styles from './index.module.less';
import { VirtualTreeContextHoc, useVirtualTreeContext } from '../TreeContext';

const Tree: FC = () => {
    const contextData = useVirtualTreeContext();
    const { virtual, props, wrapperRef } = contextData;
    const { themeClassName, applyClassName } = useTheme();
    const { virtualItems, totalSize, measureElement, distance } = virtual;
    const { renderItem, loading, style, className, wrapperClassName, wrapperStyle, select } = props;
    const { lineHeight, showData, setVisibles, isEmpty, selectedKeysObj, setSelectedKeysObj } = contextData;

    return (
        <div className={classNames(styles['wrapper'], themeClassName, applyClassName, wrapperClassName)} style={wrapperStyle}>
            <Loading loading={loading} />

            <div ref={wrapperRef} className={classNames(styles['tree'], className)} style={style}>
                {isEmpty && (
                    <div className={styles['empty']}>
                        <Empty />
                    </div>
                )}

                {!isEmpty && (
                    <div className={styles['virtual-tree']} style={{ height: totalSize, paddingTop: distance }}>
                        {virtualItems.map((verticalItem) => {
                            const currentRowIndex = verticalItem.index;
                            const currentRowData = showData?.[currentRowIndex];

                            if (currentRowData) {
                                const { data, key, label, isLeaf, visible, level } = currentRowData;
                                const selected = selectedKeysObj[key];

                                return (
                                    <div
                                        key={key}
                                        ref={measureElement}
                                        data-index={currentRowIndex}
                                        className={styles['tree-row']}
                                        style={{ minHeight: lineHeight, paddingLeft: level * 20 }}
                                    >
                                        {!isLeaf ? (
                                            <div
                                                onClick={() => setVisibles((old) => ({ ...old, [key]: !old[key] }))}
                                                className={classNames(styles['arrow'], { [styles['visible']]: visible })}
                                            >
                                                <ArrowSvg />
                                            </div>
                                        ) : (
                                            <div className={styles['empty-arrow']} />
                                        )}

                                        {select === 'checkbox' && (
                                            <div
                                                style={{ minHeight: lineHeight }}
                                                className={styles['checkbox-select-content']}
                                                onClick={() => setSelectedKeysObj({ [key]: !selected })}
                                            >
                                                <Checkbox className={styles['checkbox']} checked={selected} />
                                                <div className={styles['label']}>{renderItem ? renderItem(data, currentRowData) : label}</div>
                                            </div>
                                        )}

                                        {select === 'label' && (
                                            <div
                                                style={{ minHeight: lineHeight }}
                                                onClick={() => setSelectedKeysObj({ [key]: !selected })}
                                                className={classNames(styles['label-select-content'], { [styles['selected']]: selected })}
                                            >
                                                <div className={styles['label']}>{renderItem ? renderItem(data, currentRowData) : label}</div>
                                            </div>
                                        )}

                                        {select !== 'checkbox' && select !== 'label' && (
                                            <div className={styles['content']}>{renderItem ? renderItem(data, currentRowData) : label}</div>
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

export default VirtualTreeContextHoc(Tree);
