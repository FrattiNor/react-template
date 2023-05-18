import { Form, Picker, Popup, SearchBar } from 'antd-mobile';
import VirtualizerList from '@/components/virtualizerList';
import { FC, Fragment, useState } from 'react';
import styles from './index.module.less';

type Props = {
    opts: any[];
    name: string;
    label: string;
    loading?: boolean;
    placeholder: string;
    refetch?: () => void;
};

const FilterSelectMultiple: FC<Props> = ({ opts: _opt, refetch, name, label, placeholder }) => {
    const [visible, setVisible] = useState(false);
    const opts = [..._opt, ..._opt, ..._opt];

    return (
        <Fragment>
            <Form.Subscribe to={[name]}>
                {(subscribeValue) => {
                    const value = subscribeValue[name];
                    return (
                        <Fragment>
                            <Form.Item
                                name={name}
                                label={label}
                                onClick={() => {
                                    if (refetch) refetch();
                                    setVisible(true);
                                }}
                            >
                                <Picker columns={[]}>
                                    {() => {
                                        if (value) return <div style={{ wordBreak: 'break-all' }}>{value}</div>;
                                        return <span style={{ color: 'var(--adm-color-light)' }}>{placeholder}</span>;
                                    }}
                                </Picker>
                            </Form.Item>
                        </Fragment>
                    );
                }}
            </Form.Subscribe>

            <Popup visible={visible} bodyClassName={styles['popup-body']} onMaskClick={() => setVisible(false)} destroyOnClose>
                <div className={styles['top']}>
                    <div className={styles['button']}>取消</div>
                    <div className={styles['button']}>确定</div>
                </div>

                <div className={styles['search']}>
                    <SearchBar placeholder="搜索" />
                </div>

                <VirtualizerList
                    className={styles['content']}
                    data={opts}
                    rowKey={(_, i) => `${i}`}
                    renderItem={(item) => <div className={styles['item']}>{item.label}</div>}
                />
            </Popup>
        </Fragment>
    );
};

export default FilterSelectMultiple;
