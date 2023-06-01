import { Dispatch, FC, Fragment, SetStateAction, useState } from 'react';
import Iconfont from '@/components/Iconfont';
import { HandleTreeItem } from '../useTree';
import styles from './index.module.less';
import { Cascader } from 'antd-mobile';

type Props = {
    factoryIds: string[];
    tree: HandleTreeItem[];
    setFactoryIds: Dispatch<SetStateAction<string[]>>;
};

const FactorySelect: FC<Props> = ({ factoryIds, setFactoryIds, tree }) => {
    const [visible, setVisible] = useState(false);

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
