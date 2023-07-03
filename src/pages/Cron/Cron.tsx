import { Tabs, Card, Input, Alert } from 'antd';
import { FC, PropsWithChildren } from 'react';
import Normal from './TemplateEdit/Normal';
import Day from './TemplateEdit/Day';
import CronContext from './Context';
import { cronType } from './utils';
import useData from './useData';

const TabWrapper: FC<PropsWithChildren> = ({ children }) => {
    return <div style={{ padding: '0 6px' }}>{children}</div>;
};

type Props = {
    value?: string;
    onChange?: (v: string) => void;
};

const Cron: FC<Props> = ({ value, onChange }) => {
    const data = useData({ value, onChange });
    const { currentYear, error, expression, setExpression } = data;

    const cardTitle = (
        <div style={{ padding: '12px 0' }}>
            <Input value={expression} onChange={(e) => setExpression(e.target.value)} readOnly />
            {error && <Alert message={error || 'test'} type="error" showIcon style={{ marginTop: 12 }} />}
        </div>
    );

    return (
        <CronContext.Provider value={data}>
            <Card bodyStyle={{ padding: 0 }} title={cardTitle}>
                <Tabs
                    tabBarStyle={{ padding: '0 24px', margin: 0 }}
                    items={[
                        {
                            key: 'second',
                            label: <TabWrapper>秒</TabWrapper>,
                            children: <Normal unit="秒" type={cronType[0]} min={0} max={59} checkboxWidth={47.5} />,
                        },
                        {
                            key: 'minute',
                            label: <TabWrapper>分</TabWrapper>,
                            children: <Normal unit="分钟" type={cronType[1]} min={0} max={59} checkboxWidth={47.5} />,
                        },
                        {
                            key: 'hour',
                            label: <TabWrapper>时</TabWrapper>,
                            children: <Normal unit="小时" type={cronType[2]} min={0} max={23} checkboxWidth={47.5} />,
                        },
                        {
                            key: 'day',
                            label: <TabWrapper>日</TabWrapper>,
                            children: <Day />,
                        },
                        {
                            key: 'month',
                            label: <TabWrapper>月</TabWrapper>,
                            children: <Normal unit="月" type={cronType[4]} min={1} max={12} checkboxWidth={47.5} />,
                        },
                        {
                            key: 'year',
                            label: <TabWrapper>年</TabWrapper>,
                            children: <Normal unit="年" type={cronType[6]} min={currentYear - 19} max={currentYear + 100} />,
                        },
                    ]}
                />
            </Card>
        </CronContext.Provider>
    );
};

export default Cron;
