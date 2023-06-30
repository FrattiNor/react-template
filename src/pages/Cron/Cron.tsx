import Normal from './TemplateEdit/Normal';
import Day from './TemplateEdit/Day';
import CronContext from './Context';
import { cronType } from './const';
import { Tabs, Card } from 'antd';
import useData from './useData';
import { FC } from 'react';

const Cron: FC = () => {
    const data = useData();
    const { currentYear } = data;

    return (
        <CronContext.Provider value={data}>
            <Card bodyStyle={{ padding: 0 }}>
                <Tabs
                    tabBarStyle={{ padding: '0 24px', margin: 0 }}
                    items={[
                        {
                            key: 'second',
                            label: '秒',
                            children: <Normal unit="秒" type={cronType[0]} min={0} max={59} />,
                        },
                        {
                            key: 'minute',
                            label: '分',
                            children: <Normal unit="分钟" type={cronType[1]} min={0} max={59} />,
                        },
                        {
                            key: 'hour',
                            label: '时',
                            children: <Normal unit="小时" type={cronType[2]} min={0} max={23} />,
                        },
                        {
                            key: 'day',
                            label: '日',
                            children: <Day />,
                        },
                        {
                            key: 'month',
                            label: '月',
                            children: <Normal unit="月" type={cronType[4]} min={1} max={31} />,
                        },
                        {
                            key: 'year',
                            label: '年',
                            children: <Normal unit="年" type={cronType[6]} min={currentYear - 1000} max={currentYear + 1000} />,
                        },
                    ]}
                />
            </Card>
        </CronContext.Provider>
    );
};

export default Cron;
