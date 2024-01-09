import { ReactNode, forwardRef, useImperativeHandle, useState } from 'react';
import { TableColumnConfProps, TableColumnConfRef } from '../type';
import { useResetData, useSubmitData } from './hooks';
import { useTranslation } from '@pkg/i18n';
import styles from './index.module.less';
import Checkbox from '@pkg/checkbox';
import classNames from 'classnames';
import Sortable from '../Sortable';
import { Select } from 'antd';

type ComponentType = (props: TableColumnConfProps & React.RefAttributes<TableColumnConfRef>) => ReactNode | null;

const TableColumnsConf: ComponentType = forwardRef((props, ref) => {
    const { t1 } = useTranslation();

    const submitData = useSubmitData(props);

    const getResetData = useResetData(props);

    const [data, setData] = useState(props.columns);

    // 暴露提交和重置
    useImperativeHandle(
        ref,
        () => ({
            submit: () => {
                submitData(data);
            },
            reset: () => {
                setData(getResetData());
            },
        }),
        [data],
    );

    const fixedOption = [
        {
            label: t1('左固定'),
            value: 'left',
        },
        {
            label: t1('右固定'),
            value: 'right',
        },
        {
            label: t1('默认'),
            value: 'default',
        },
    ];

    const checkedChange = (show: boolean, index: number) => {
        setData((oldData) => {
            const currentItem = oldData[index];
            if (currentItem) {
                oldData[index] = {
                    ...currentItem,
                    hidden: !show,
                };
                return [...oldData];
            } else {
                return oldData;
            }
        });
    };

    const widthChange = (v: string, index: number) => {
        setData((oldData) => {
            const currentItem = oldData[index];
            if (currentItem) {
                oldData[index] = {
                    ...currentItem,
                    width: Number(v),
                };
                return [...oldData];
            } else {
                return oldData;
            }
        });
    };

    const fixedChange = (v: string, index: number) => {
        setData((oldData) => {
            const currentItem = oldData[index];
            if (currentItem) {
                oldData[index] = {
                    ...currentItem,
                    fixed: v as any,
                };
                return [...oldData];
            } else {
                return oldData;
            }
        });
    };

    return (
        <div className={styles['wrapper']}>
            <Sortable
                items={data}
                setItems={setData}
                renderItem={(item, { index, newIndex, wrapperProps, sortProps, overlay }) => {
                    const isStr = typeof item.title === 'string' || typeof item.title === 'number';

                    return (
                        <div
                            key={item.key}
                            {...wrapperProps}
                            title={isStr ? `${item.title}` : undefined}
                            className={classNames(styles['item'], { [styles['first-child']]: newIndex === 0, [styles['overlay']]: overlay })}
                        >
                            <div className={styles['checkbox']}>
                                <Checkbox checked={!item.hidden} onChange={(v) => checkedChange(v, index ?? -1)} />
                            </div>

                            <div className={styles['text']}>{item.title}</div>

                            <div className={styles['fixed']}>
                                <span className={styles['label']}>{t1('固定')}</span>
                                <Select
                                    size="small"
                                    value={item.fixed}
                                    style={{ width: 85 }}
                                    options={fixedOption}
                                    onChange={(v) => fixedChange(v, index ?? -1)}
                                />
                            </div>

                            <div className={styles['width']}>
                                <span className={styles['label']}>{t1('宽度')}</span>
                                <input
                                    type="number"
                                    style={{ width: 85 }}
                                    defaultValue={item.width}
                                    onChange={(e) => widthChange(e.target.value, index ?? -1)}
                                />
                                <span className={styles['label']}>{'px'}</span>
                            </div>

                            <div className={classNames(styles['handle'], { [styles['overlay']]: overlay })} {...sortProps}>
                                <svg viewBox="0 0 20 20" width="12">
                                    <path
                                        fill="currentColor"
                                        d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    );
                }}
            />
        </div>
    );
});

export default TableColumnsConf;
