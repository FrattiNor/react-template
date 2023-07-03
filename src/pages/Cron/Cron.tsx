import useData, { cronType } from './useData';
import { FC, PropsWithChildren } from 'react';
import Normal from './TemplateEdit/Normal';
import { Tabs, Card, Input } from 'antd';
import Day from './TemplateEdit/Day';
import CronContext from './Context';

const TabWrapper: FC<PropsWithChildren> = ({ children }) => {
    return <div style={{ padding: '0 6px' }}>{children}</div>;
};

const Cron: FC = () => {
    const data = useData();
    const { currentYear, expression, setExpression } = data;

    return (
        <CronContext.Provider value={data}>
            <Card bodyStyle={{ padding: 0 }} title={<Input value={expression} onChange={(e) => setExpression(e.target.value)} />}>
                <Tabs
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
                            children: <Normal unit="月" type={cronType[4]} min={1} max={31} />,
                        },
                        {
                            key: 'year',
                            label: <TabWrapper>年</TabWrapper>,
                            children: <Normal unit="年" type={cronType[6]} min={currentYear - 1000} max={currentYear + 1000} />,
                        },
                    ]}
                />
            </Card>
        </CronContext.Provider>
    );
};

export default Cron;
