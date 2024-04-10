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
                        const currentRowIndex = verticalItem.index;
                        const currentRowData = showData?.[currentRowIndex];

                        if (currentRowData) {
                            const { data, key, label, isLeaf, visible, level } = currentRowData;
                            const selected = key === selectedKey;

                            const onVisibleClick = () => {
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

                            return (
                                <div
                                    key={key}
                                    ref={measureElement}
                                    data-index={currentRowIndex}
                                    className={styles['tree-row']}
                                    style={{ minHeight: lineHeight, paddingLeft: level * 20 }}
                                >
                                    {!isLeaf ? (
                                        <div onClick={onVisibleClick} className={classNames(styles['arrow'], { [styles['visible']]: visible })}>
                                            <ArrowSvg />
                                        </div>
                                    ) : (
                                        <div className={styles['empty-arrow']} />
                                    )}

                                    <div
                                        style={{ minHeight: lineHeight }}
                                        onClick={() => setSelectedKey(selected ? undefined : key, currentRowData.data)}
                                        className={classNames(styles['label-select-content'], { [styles['selected']]: selected })}
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
                    })}
                </div>
            )}
        </div>
    );
};

export default TreeInner;
