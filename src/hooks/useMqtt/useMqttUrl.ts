import { isDev, mqttDevUrl } from '@/env';
import useIp from '../useIp';

const useMqttUrl = () => {
    const constValue = useIp();

    const mqttUrl = `${constValue.mqttProtocol}://${constValue.mqttIp}:${constValue.mqttPort}/mqtt`;

    return isDev ? mqttDevUrl : mqttUrl;
};

export default useMqttUrl;
