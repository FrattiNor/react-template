import { Dispatch, FC, Fragment, SetStateAction, useState } from 'react';
import Iconfont from '@/components/Iconfont';
import { HandleTreeItem } from '../useTree';
import { Popup, Tabs } from 'antd-mobile';
import styles from './index.module.less';
import classNames from 'classnames';

type Props = {
    factoryIds: string[];
    tree: HandleTreeItem[];
    idMap: Record<string, HandleTreeItem>;
    setFactoryIds: Dispatch<SetStateAction<string[]>>;
};

type InnerProps = Props & {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
};

const Inner: FC<InnerProps> = ({ factoryIds, setFactoryIds, idMap, setVisible, tree }) => {
    const [value, setValue] = useState(factoryIds || []);

    const [activeKey, setActiveKey] = useState(() => idMap[value[value.length - 1]].value);

    const haveNext = !!idMap[activeKey]?.children;

    const tabItems2 = [
        ...value.map((v) => ({
            title: idMap[v]?.label,
            key: idMap[v]?.value,
        })),
        ...(haveNext
            ? [
                  {
                      title: '请选择',
                      key: '0',
                  },
              ]
            : []),
    ];

    const submit = () => {
        setFactoryIds(value);
        setVisible(false);
    };

    return (
        <Fragment>
            <div className={styles['top']}>
                <div className={styles['button']} onClick={() => setVisible(false)}>
                    取消
                </div>
                <div className={styles['button']} onClick={submit}>
                    确定
                </div>
            </div>

            <Tabs activeKey={activeKey} onChange={setActiveKey} stretch={false} className={styles['tabs']}>
                {tabItems2.map((item) => (
                    <Tabs.Tab key={item.key} title={item.title} />
                ))}
            </Tabs>

            <div className={styles['content']}>
                {tabItems2.map((item, i) => {
                    const show = i === 0 ? tree : idMap[tabItems2[i - 1].key].children;

                    return (
                        <div className={styles['content-inner']} key={item.key} style={{ display: item.key === activeKey ? 'block' : 'none' }}>
                            {show?.map((item2) => {
                                const checked = value.includes(item2.value);
                                const onClick = () => {
                                    if (checked) setValue([...value.slice(0, i)]);
                                };

                                return (
                                    <div className={styles['item']} key={item2.value} onClick={onClick}>
                                        <div className={classNames(styles['label'], { [styles['checked']]: checked })}>{item2.label}</div>
                                        <div className={classNames(styles['icon'], { [styles['show']]: checked })}>
                                            <Iconfont icon="yes" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </Fragment>
    );
};

const FactorySelect: FC<Props> = (props) => {
    const [visible, setVisible] = useState(false);

    return (
        <Fragment>
            <div className={styles['wrapper']} onClick={() => setVisible(true)}>
                <Iconfont icon="tree" />
            </div>

            <Popup visible={visible} onMaskClick={() => setVisible(false)} bodyClassName={styles['popup-body']} destroyOnClose>
                {Object.keys(props.idMap).length > 0 && <Inner {...props} visible={visible} setVisible={setVisible} />}
            </Popup>
        </Fragment>
    );
};

export default FactorySelect;
