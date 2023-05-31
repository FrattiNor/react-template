import useIp from '../useIp';

const useMqttUrl = () => {
    const constValue = useIp();

    const mqttUrl = `${constValue.mqttProtocol}://${constValue.mqttIp}:${constValue.mqttPort}/mqtt`;

    return mqttUrl;
};

export default useMqttUrl;
