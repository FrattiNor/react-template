import { ConstValue, useConstValue } from '@/services/global';
import { useMemo } from 'react';

const useMqttUrl = () => {
    const { port, protocol, hostname } = window.location;

    const defaultConstValue: ConstValue = {
        webIp: hostname,
        webPort: port,
        webProtocol: protocol.replace(':', ''),
        suposIp: hostname,
        suposPort: '8080',
        suposProtocol: protocol.replace(':', ''),
        mqttIp: hostname,
        mqttPort: '30326',
        mqttProtocol: 'ws',
    };

    const constValues = useConstValue().data;

    const constValue = useMemo(() => {
        let c = defaultConstValue;

        constValues?.some((item) => {
            if (item.webIp === hostname && item.webPort === port && item.webProtocol === protocol.replace(':', '')) {
                c = item;
                return true;
            }
            return false;
        });

        return c;
    }, [constValues]);

    const mqttUrl = `${constValue.mqttProtocol}://${constValue.mqttIp}:${constValue.mqttPort}/mqtt`;

    return mqttUrl;
};

export default useMqttUrl;
