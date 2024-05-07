import type { FC } from 'react';

import { Checkbox, Radio } from 'antd';
import classNames from 'classnames';

import ArrowSvg from './ArrowSvg';
import styles from './index.module.less';
import Empty from '../../../../../Empty';
import Highlight from '../../../../../Highlight';
import useSelect from '../useSelect';

import type { VirtualTreeSelectProps } from '../type';

const Select: FC<VirtualTreeSelectProps<any>> = (props) => {
    const list = useSelect(props);
    const { multiple, keyword } = props;
    const { virtual, virtualWrapperRef, lineHeight } = list;
    const { isEmpty, showData, selectedKeys, setSelectedKeys, setVisibles } = list;
    const { virtualItems, totalSize, measureElement, distance } = virtual;

    return (
        <div ref={virtualWrapperRef} className={styles['tree']}>
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
                                const { key, label, isLeaf, level, disabled, visible } = currentRowData;
                                const selected = selectedKeys.includes(key);

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

                                const onCheckedClick = () => {
                                    if (!selected) {
                                        if (multiple === true) {
                                            setSelectedKeys((old) => [...old, key]);
                                        } else {
                                            setSelectedKeys([key]);
                                        }
                                    } else {
                                        if (multiple === true) {
                                            setSelectedKeys((old) => [...old.filter((item) => item !== key)]);
                                        } else {
                                            setSelectedKeys([]);
                                        }
                                    }
                                };

                                return (
                                    <div
                                        key={key}
                                        ref={measureElement}
                                        data-index={currentRowIndex}
                                        className={styles['tree-row']}
                                        style={{ minHeight: lineHeight, paddingLeft: 6 + level * 20 }}
                                    >
                                        {!isLeaf ? (
                                            <div onClick={onVisibleClick} className={classNames(styles['arrow'], { [styles['visible']]: visible })}>
                                                <ArrowSvg />
                                            </div>
                                        ) : (
                                            <div className={styles['empty-arrow']} />
                                        )}

                                        {multiple === true ? (
                                            <Checkbox disabled={disabled} checked={selected} onClick={onCheckedClick} style={{ width: '100%' }}>
                                                <Highlight keyword={keyword}>{label}</Highlight>
                                            </Checkbox>
                                        ) : (
                                            <Radio disabled={disabled} checked={selected} onClick={onCheckedClick} style={{ width: '100%' }}>
                                                <Highlight keyword={keyword}>{label}</Highlight>
                                            </Radio>
                                        )}
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

export default Select;
