import { useCallback, useState } from 'react';
import useMqtt from '@/hooks/useMqtt';

const useHaveNew = ({ deviceId, factoryModelId }: { deviceId?: string; factoryModelId?: string }) => {
    const [haveNew, setHaveNew] = useState(false);

    useMqtt({
        onConnect: ({ client }) => {
            // 对应设备详情，工厂报警，以及全部报警
            if (deviceId) {
                client.subscribe(`basic/alarm/device/${deviceId}`);
            } else if (factoryModelId) {
                client.subscribe(`basic/alarm/factoryModel/${factoryModelId}`);
            } else {
                client.subscribe('basic/alarm/count');
            }
        },
        onMessage: useCallback(() => {
            setHaveNew(true);
        }, []),
    });

    return { haveNew, setHaveNew };
};

export default useHaveNew;
