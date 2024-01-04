import { ReactNode, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { TableColumnConfProps, TableColumnConfData, TableColumnConfRef } from '../type';
import { useDefaultData, useResetData, useSubmitData } from './hooks';
import SortableMultiple from '../SortableMultiple';
import { useTranslation } from '@pkg/i18n';
import styles from './index.module.less';
import Checkbox from '@pkg/checkbox';

type ComponentType = (props: TableColumnConfProps & React.RefAttributes<TableColumnConfRef>) => ReactNode | null;

const TableColumnsConf: ComponentType = forwardRef((props, ref) => {
    const { t1 } = useTranslation();

    const titleMap: Record<string, string> = {
        leftColumns: t1('左固定'),
        midColumns: t1('不固定'),
        rightColumns: t1('右固定'),
    };

    const submitData = useSubmitData();

    const getResetData = useResetData(props);

    const getDefaultData = useDefaultData(props);

    const [data, setData] = useState<TableColumnConfData>(getDefaultData);

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

    return (
        <SortableMultiple
            data={data}
            setData={setData}
            titleMap={titleMap}
            renderItem={(item, { containerId, index }) => {
                const isStr = typeof item.title === 'string' || typeof item.title === 'number';

                const checkedChange = (show: boolean) => {
                    if (containerId && typeof index === 'number') {
                        setData((oldData) => {
                            const items = [...oldData[containerId]];
                            items[index] = { ...items[index], hidden: !show };
                            return { ...oldData, [containerId]: [...items] };
                        });
                    }
                };

                return (
                    <div key={item.key} className={styles['item']}>
                        <Checkbox checked={!item.hidden} onChange={checkedChange} />
                        <span className={styles['text']} title={isStr ? `${item.title}` : undefined}>
                            {item.title}
                        </span>
                    </div>
                );
            }}
        />
    );
});

export default TableColumnsConf;
