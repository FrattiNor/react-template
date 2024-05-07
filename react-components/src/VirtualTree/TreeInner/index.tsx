import type { FC } from 'react';

import classNames from 'classnames';

import ArrowSvg from './ArrowSvg';
import styles from './index.module.less';
import Empty from '../../Empty';
import Highlight from '../../Highlight';

import type { VirtualTreeInstance, VirtualTreeProps } from '../type';

type Props = VirtualTreeProps<any> & {
    instance: VirtualTreeInstance<any>;
};

const TreeInner: FC<Props> = (props) => {
    const { renderItem, treeClassName, treeStyle, instance } = props;
    const { virtual, virtualWrapperRef, lineHeight, showData, setVisibles, isEmpty, selectedKey, setSelectedKey, keyword } = instance;
    const { virtualItems, totalSize, measureElement, distance } = virtual;

    return (
        <div ref={virtualWrapperRef} className={classNames(styles['tree'], treeClassName)} style={treeStyle}>
            {isEmpty && (
                <div className={styles['empty']}>
                    <Empty />
                </div>
            )}

            {!isEmpty && (
                <div className={styles['virtual-tree']} style={{ height: totalSize, paddingTop: distance }}>
                    {virtualItems.map((verticalItem) => {
                        const currentRowIndex = verticalItem?.index;

                        if (typeof currentRowIndex === 'number') {
                            const currentRowData = showData?.[currentRowIndex];

                            if (currentRowData) {
                                const { data, key, label, isLeaf, visible, level, disabled } = currentRowData;
                                const selected = key === selectedKey;

                                const onArrowClick = () => {
                                    if (visible) {
                                        setVisibles((old) => {
                                            const next = { ...old };
                                            delete next[key];
                                            return { ...next };
                                        });
                                    } else {
                                        setVisibles((old) => ({
                                            ...old,
                                            [key]: true,
                                        }));
                                    }
                                };

                                const onLabelClick = () => {
                                    if (!disabled) {
                                        setSelectedKey(selected ? undefined : key, currentRowData.data);
                                    }
                                };

                                return (
                                    <div
                                        key={key}
                                        ref={measureElement}
                                        data-index={currentRowIndex}
                                        className={styles['tree-row']}
                                        style={{ minHeight: lineHeight, paddingLeft: level * 20 }}
                                    >
                                        {!isLeaf ? (
                                            <div onClick={onArrowClick} className={classNames(styles['arrow'], { [styles['visible']]: visible })}>
                                                <ArrowSvg />
                                            </div>
                                        ) : (
                                            <div className={styles['empty-arrow']} />
                                        )}

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
                                            <div className={styles['label']}>
                                                {renderItem ? (
                                                    renderItem(data, currentRowData, keyword)
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

export default TreeInner;
