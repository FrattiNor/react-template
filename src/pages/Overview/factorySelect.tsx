import { useFactoryModelTree } from '@/services/overview';
import { Fragment, useMemo, useState } from 'react';
import { Cascader } from 'antd-mobile';
import styles from './factorySelect.module.less';
import { handleFactoryModelTree } from './utils';
import Iconfont from '@/components/Iconfont';

const FactorySelect = () => {
    const [visible, setVisible] = useState(false);
    const { data } = useFactoryModelTree();
    const { tree } = useMemo(() => {
        if (data) return handleFactoryModelTree(data);
        return { tree: [], idMap: {} };
    }, [data]);

    return (
        <Fragment>
            <div className={styles['wrapper']} onClick={() => setVisible(true)}>
                <Iconfont icon="tree" />
            </div>

            <Cascader className={styles['cascader']} options={tree} visible={visible} onClose={() => setVisible(false)} />
        </Fragment>
    );
};

export default FactorySelect;
