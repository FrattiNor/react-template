import { PointItem } from '@/services/pointTrend';
import { useCallback, useState } from 'react';
import useMqtt from '@/hooks/useMqtt';

type EchartsValueItem = {
    name: string;
    value: [number, number | null];
};

type Res = Record<string, PointItem>;

//
const formatTimestamp = (timestamp: number) => {
    const res = Number((timestamp / 1000).toFixed(0)) * 1000;
    return res;
};

// topic
const subscribeTopic = 'realtime/web/{id}/realtimeTrendChart';
const willTopic = 'web/realtime/disconnect/{id}/realtimeTrendChart';
const publishTopic = 'web/realtime/connect/{id}/realtimeTrendChart';

const useData = ({ fullPointTags }: { fullPointTags: string[] }) => {
    const [maps, setMaps] = useState<Record<string, EchartsValueItem[]>>({});

    useMqtt({
        will: willTopic,
        onConnect: ({ client }) => {
            client.subscribe(subscribeTopic, () => {
                const payload = JSON.stringify(fullPointTags.map((fullPointTag) => ({ fullPointTag })));
                client.publish(publishTopic, payload);
            });
        },
        onMessage: useCallback((_: any, payload: Res) => {
            setMaps((beforeMap) => {
                const nextMap = { ...beforeMap };
                Object.entries(payload).forEach(([k, { pointTag, timestamp, value }]) => {
                    const count = value === null ? null : Number(value);
                    if (!nextMap[k]) nextMap[k] = [];
                    nextMap[k].push({
                        name: pointTag,
                        value: [formatTimestamp(Number(timestamp)), count],
                    });
                    // 多于31个，取31个
                    if (nextMap[k].length > 31) {
                        nextMap[k] = nextMap[k].slice(-31);
                    }
                });
                return nextMap;
            });
        }, []),
    });

    return maps;
};

export default useData;
