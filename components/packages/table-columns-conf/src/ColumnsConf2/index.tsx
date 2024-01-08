import { ReactNode, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { TableColumnConfProps, TableColumnConfRef, TableConfColumn } from '../type';
import { useDefaultData, useResetData, useSubmitData } from './hooks';
import { useTranslation } from '@pkg/i18n';
import styles from './index.module.less';
import Checkbox from '@pkg/checkbox';
import Sortable from '../Sortable';
import { Select } from 'antd';

type ComponentType = (props: TableColumnConfProps & React.RefAttributes<TableColumnConfRef>) => ReactNode | null;

const TableColumnsConf: ComponentType = forwardRef((props, ref) => {
    const { t1 } = useTranslation();

    const submitData = useSubmitData();

    const getResetData = useResetData(props);

    const getDefaultData = useDefaultData(props);

    const [data, setData] = useState<TableConfColumn[]>(getDefaultData);

    // columns 变更触发
    useEffect(() => {
        setData(getDefaultData());
    }, [props.columns]);

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

    return (
        <div className={styles['wrapper']}>
            <Sortable
                items={data}
                setItems={setData}
                renderItem={(item, { index }) => {
                    const isStr = typeof item.title === 'string' || typeof item.title === 'number';

                    const checkedChange = (show: boolean) => {
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

                    const widthChange = (v: string) => {
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

                    const fixedChange = (v: string) => {
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
                        <div key={item.key} className={styles['item']} title={isStr ? `${item.title}` : undefined}>
                            <div className={styles['checkbox']}>
                                <Checkbox checked={!item.hidden} onChange={checkedChange} />
                            </div>
                            <div className={styles['text']}>{item.title}</div>
                            <div className={styles['fixed']}>
                                <span className={styles['label']}>{t1('固定')}</span>
                                <Select style={{ width: 85 }} value={item.fixed} onChange={fixedChange} size="small" options={fixedOption} />
                            </div>
                            <div className={styles['width']}>
                                <span className={styles['label']}>{t1('宽度')}</span>
                                <input type="number" style={{ width: 85 }} value={item.width} onChange={(e) => widthChange(e.target.value)} />
                                <span className={styles['label']}>{'px'}</span>
                            </div>
                        </div>
                    );
                }}
            />
        </div>
    );
});

export default TableColumnsConf;
