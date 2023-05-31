import { Dispatch, FC, Fragment, SetStateAction, useEffect, useState } from 'react';
import { useFactoryModelHomePage } from '@/services/overview';
import Iconfont from '@/components/Iconfont';
import { HandleTreeItem } from '../utils';
import styles from './index.module.less';
import { Cascader } from 'antd-mobile';

type Props = {
    factoryIds: string[];
    tree: HandleTreeItem[];
    idMap: Record<string, HandleTreeItem>;
    setFactoryIds: Dispatch<SetStateAction<string[]>>;
};

const FactorySelect: FC<Props> = ({ factoryIds, setFactoryIds, tree, idMap }) => {
    const [visible, setVisible] = useState(false);
    const homePageQuery = useFactoryModelHomePage();

    // 设置首页
    useEffect(() => {
        if (homePageQuery.data) {
            const homePageId = homePageQuery.data.factoryModelId;
            if (idMap[homePageId]) setFactoryIds(idMap[homePageId].ids);
        }
    }, [idMap, homePageQuery.data]);

    return (
        <Fragment>
            <div className={styles['wrapper']} onClick={() => setVisible(true)}>
                <Iconfont icon="tree" />
            </div>

            <Cascader
                options={tree}
                visible={visible}
                value={factoryIds}
                className={styles['cascader']}
                onClose={() => setVisible(false)}
                onConfirm={(v) => setFactoryIds(v)}
            />
        </Fragment>
    );
};

export default FactorySelect;
