import { useFactoryMqttInitValue } from '@/services/overview';
import { useCallback, useEffect, useState } from 'react';
import { HandleTreeItem } from './useTree';
import useMqtt from '@/hooks/useMqtt';

type HandledData = { type: string; id: string };
type MqttRes = { alarmStatus: number; id: string };

// topic
const subscribeTopic = (id: string) => `basic/alarm/factoryModel/${id}`;
const willTopic = 'web/realtime/disconnect/{id}/realtimePointValue';

const useMqtt2 = (data: HandleTreeItem[]) => {
    const [handledData, setHandledData] = useState<HandledData[]>([]);
    const [alarmInfo, setAlarmInfo] = useState<Record<string, number>>({});
    useFactoryMqttInitValue(handledData);

    const client = useMqtt({
        will: willTopic,
        onMessage: useCallback((_: any, payload: MqttRes) => {
            setAlarmInfo((i) => ({ ...i, [payload.id]: payload.alarmStatus }));
        }, []),
    });

    useEffect(() => {
        if (client) {
            if (Array.isArray(data) && data.length > 0) {
                const nextHandledData: HandledData[] = data.map((item) => ({ type: 'area', id: item.value }));
                // 订阅
                nextHandledData.forEach((item) => client.subscribe(subscribeTopic(item.id), { qos: 1 }));
                // 设置处理data，触发获取初始值推送
                setHandledData(nextHandledData);
                // 清空旧报警
                setAlarmInfo({});

                return () => {
                    // 取消订阅
                    nextHandledData.forEach((item) => client.unsubscribe(subscribeTopic(item.id)));
                };
            }
        }
    }, [data, client]);

    return alarmInfo;
};

export default useMqtt2;
