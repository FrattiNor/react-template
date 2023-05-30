import { useCallback, useEffect, useState } from 'react';
import { PointItem } from '@/services/pointTrend';
import useMqtt from '@/hooks/useMqtt';
import { Params } from './type';

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

const useData = ({ fullPointTags }: Params) => {
    const [data, setData] = useState<Record<string, PointItem[]>>({});

    const client = useMqtt({
        will: willTopic,
        onConnect: ({ client: _client }) => {
            _client.subscribe(subscribeTopic);
        },
        onMessage: useCallback((_: any, payload: Res) => {
            setData((beforeMap) => {
                const nextMap = { ...beforeMap };
                Object.entries(payload).forEach(([k, { pointTag, timestamp, value, datasourceName }]) => {
                    if (!nextMap[k]) nextMap[k] = [];
                    nextMap[k].push({
                        value,
                        pointTag,
                        datasourceName,
                        timestamp: `${formatTimestamp(Number(timestamp))}`,
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

    useEffect(() => {
        if (Array.isArray(fullPointTags) && fullPointTags.length > 0) {
            const payload = JSON.stringify(fullPointTags.map((fullPointTag) => ({ fullPointTag })));
            client.publish(publishTopic, payload);
        }
    }, [fullPointTags]);

    return data;
};

export default useData;
