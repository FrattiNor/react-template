import { FC, PropsWithChildren, useMemo } from 'react';
import Normal from '../TemplateEdit/Normal';
import styles from './index.module.less';
import Year from '../TemplateEdit/Year';
import Day from '../TemplateEdit/Day';
import CronContext from '../Context';
import translate from '../translate';
import { cronType } from '../utils';
import { Tabs, Alert } from 'antd';
import useData from '../useData';

const TabWrapper: FC<PropsWithChildren> = ({ children }) => {
    return <div style={{ padding: '0 6px' }}>{children}</div>;
};

type Props = {
    value?: string;
    onChange?: (v: string) => void;
};

const Cron: FC<Props> = ({ value, onChange }) => {
    const data = useData({ value, onChange });
    const { error, expression } = data;
    const showText = useMemo(() => translate(expression), [expression]);

    return (
        <CronContext.Provider value={data}>
            <div className={styles['wrapper']}>
                <div className={styles['title']}>
                    <div className={styles['text']}>{showText}</div>
                    {error && <Alert message={error} type="error" showIcon style={{ marginTop: 8 }} />}
                </div>
                <Tabs
                    destroyInactiveTabPane
                    tabBarStyle={{ padding: '0 24px', margin: 0 }}
                    items={[
                        {
                            key: 'second',
                            label: <TabWrapper>秒</TabWrapper>,
                            children: <Normal unit="秒" type={cronType[0]} min={0} max={59} />,
                        },
                        {
                            key: 'minute',
                            label: <TabWrapper>分</TabWrapper>,
                            children: <Normal unit="分钟" type={cronType[1]} min={0} max={59} />,
                        },
                        {
                            key: 'hour',
                            label: <TabWrapper>时</TabWrapper>,
                            children: <Normal unit="小时" type={cronType[2]} min={0} max={23} />,
                        },
                        {
                            key: 'day',
                            label: <TabWrapper>日</TabWrapper>,
                            children: <Day />,
                        },
                        {
                            key: 'month',
                            label: <TabWrapper>月</TabWrapper>,
                            children: <Normal unit="月" type={cronType[4]} min={1} max={12} />,
                        },
                        {
                            key: 'year',
                            label: <TabWrapper>年</TabWrapper>,
                            children: <Year />,
                        },
                    ]}
                />
            </div>
        </CronContext.Provider>
    );
};

export default Cron;
