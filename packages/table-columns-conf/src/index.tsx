import { useDefaultData, useSubmitData } from './hooks';
import SortableMultiple from './SortableMultiple';
import styles from './index.module.less';
import { FC, useState } from 'react';
import Checkbox from '@pkg/checkbox';
import { Props, Data } from './type';

const titleMap: Record<string, string> = {
    leftColumns: '左固定',
    midColumns: '不固定',
    rightColumns: '右固定',
};

const TableColumnsConf: FC<Props> = (props) => {
    const submitData = useSubmitData();

    const getDefaultData = useDefaultData(props);

    const [data, setData] = useState<Data>(getDefaultData);

    const setData2: React.Dispatch<React.SetStateAction<Data>> = (v) => {
        setData((oldV) => {
            if (typeof v === 'function') {
                const res = v(oldV);
                submitData(res);
                return res;
            } else {
                const res = v;
                submitData(res);
                return res;
            }
        });
    };

    return (
        <SortableMultiple
            data={data}
            setData={setData2}
            titleMap={titleMap}
            renderItem={(item, { containerId, index }) => {
                const isStr = typeof item.title === 'string' || typeof item.title === 'number';

                const checkedChange = (show: boolean) => {
                    if (containerId && typeof index === 'number') {
                        setData2((oldData) => {
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
};

export default TableColumnsConf;
