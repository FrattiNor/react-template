import { isDev } from '@/env';
import { ConstValue, useConstValue } from '@/services/global';
import { useMemo } from 'react';

const useIp = () => {
    const { port, protocol, hostname } = window.location;

    const devConstValue: ConstValue = {
        webIp: hostname,
        webPort: port,
        webProtocol: protocol.replace(':', ''),
        suposIp: '10.50.0.49',
        suposPort: '8080',
        suposProtocol: 'http',
        mqttIp: '10.50.0.49',
        mqttPort: '30326',
        mqttProtocol: 'ws',
        mobileIp: hostname,
        mobilePort: port,
        mobileProtocol: protocol.replace(':', ''),
    };

    const constValues = useConstValue().data;

    const constValue = useMemo(() => {
        let c = devConstValue;

        constValues?.some((item) => {
            if (item.mobileIp === hostname && item.mobilePort === port && item.mobileProtocol === protocol.replace(':', '')) {
                c = item;
                return true;
            }
            return false;
        });

        return c;
    }, [constValues]);

    return isDev ? devConstValue : constValue;
};

export default useIp;
