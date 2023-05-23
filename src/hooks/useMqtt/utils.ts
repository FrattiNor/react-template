import type { IClientOptions } from 'mqtt';

export const replaceTopic = ({ topic, clientId }: { topic: string; clientId: string }) => {
    return topic.replaceAll('{id}', clientId);
};

export const getWill = (clientId: string, will?: string) => {
    if (!will) return undefined;
    return {
        topic: replaceTopic({ topic: will, clientId }),
        retain: false,
        payload: '',
        qos: 2,
    } as IClientOptions['will'];
};
