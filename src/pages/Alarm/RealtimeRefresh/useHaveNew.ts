import { useCallback, useState } from 'react';
import useMqtt from '@/hooks/useMqtt';

const useHaveNew = (deviceId?: string) => {
    const [haveNew, setHaveNew] = useState(false);

    useMqtt({
        onConnect: ({ client }) => {
            client.subscribe(deviceId ? `basic/device/alarm/count/${deviceId}` : 'basic/alarm/count');
        },
        onMessage: useCallback(() => {
            setHaveNew(true);
        }, []),
    });

    return { haveNew, setHaveNew };
};

export default useHaveNew;
