import type { FC } from 'react';

import { Checkbox, Radio } from 'antd';

import styles from './index.module.less';
import Empty from '../../../../../Empty';
import Highlight from '../../../../../Highlight';
import useSelect from '../useSelect';

import type { VirtualSelectProps } from '../type';

const SelectInner: FC<VirtualSelectProps<any>> = (props) => {
    const list = useSelect(props);
    const { multiple, keyword } = props;
    const { virtual, virtualWrapperRef, lineHeight, isEmpty, showData, selectedKeys, setSelectedKeys } = list;
    const { virtualItems, totalSize, measureElement, distance } = virtual;

    return (
        <div ref={virtualWrapperRef} className={styles['list']}>
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
                            const currentRowData = showData?.[currentRowIndex];

                            if (currentRowData) {
                                const { key, label, disabled } = currentRowData;
                                const selected = selectedKeys.includes(key);

                                const onClick = () => {
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
                                        ref={measureElement}
                                        key={key}
                                        data-index={currentRowIndex}
                                        className={styles['list-row']}
                                        style={{ minHeight: lineHeight }}
                                    >
                                        {multiple === true ? (
                                            <Checkbox checked={selected} onClick={onClick} style={{ width: '100%' }} disabled={disabled}>
                                                <Highlight keyword={keyword}>{label}</Highlight>
                                            </Checkbox>
                                        ) : (
                                            <Radio checked={selected} onClick={onClick} style={{ width: '100%' }} disabled={disabled}>
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

export default SelectInner;
