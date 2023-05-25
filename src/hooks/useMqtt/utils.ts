import type {
    ClientSubscribeCallback,
    IClientOptions,
    IClientSubscribeOptions,
    ISubscriptionMap,
    MqttClient,
    IClientPublishOptions,
    PacketCallback,
} from 'mqtt';

// 替换topic里的id，更方便的使用clientId
export const replaceTopic = ({ topic, clientId }: { topic: string; clientId: string }) => {
    return topic.replaceAll('{id}', clientId);
};

// 使useMqtt的will参数简化，内置替换topic
export const getWill = (clientId: string, will?: string) => {
    if (!will) return undefined;
    return {
        topic: replaceTopic({ topic: will, clientId }),
        retain: false,
        payload: '',
        qos: 2,
    } as IClientOptions['will'];
};

// 替换callback
const replaceCallback = (innerCb: () => void, cb?: any) => {
    return (...rest: any) => {
        innerCb();
        if (typeof cb === 'function') cb(...rest);
    };
};

// 替换client的订阅函数，内置替换topic和替换callback
export const replaceSubscribe = (client: MqttClient, clientId: string) => {
    const nativeSubscribe = client.subscribe.bind(client);
    // 重载
    function subscribe(topic: string | string[], opts: IClientSubscribeOptions, callback?: ClientSubscribeCallback): MqttClient;
    function subscribe(topic: string | string[] | ISubscriptionMap, callback?: ClientSubscribeCallback): MqttClient;
    // 实现重载
    function subscribe(
        topic: string | string[] | ISubscriptionMap,
        optsOrCb?: IClientSubscribeOptions | ClientSubscribeCallback,
        callback?: ClientSubscribeCallback,
    ) {
        // topic替换id
        let newTopic = topic;
        if (typeof topic === 'string') {
            newTopic = replaceTopic({ topic, clientId });
        }
        if (Array.isArray(topic)) {
            newTopic = topic.map((t) => replaceTopic({ topic: t, clientId }));
        }
        if (Object.prototype.toString.call(topic) === '[object Object]') {
            Object.keys(topic).forEach((k) => {
                (newTopic as ISubscriptionMap)[replaceTopic({ topic: k, clientId })] = (topic as ISubscriptionMap)[k];
            });
        }

        // 执行原生subscribe函数，并替换callback
        const innerCb = () => {
            console.log(`已订阅: ${newTopic}`);
            console.log(newTopic);
        };
        if (typeof optsOrCb === 'function' || typeof optsOrCb === 'undefined') {
            nativeSubscribe(newTopic, replaceCallback(innerCb, optsOrCb));
        } else {
            nativeSubscribe(newTopic as string | string[], optsOrCb, replaceCallback(innerCb, callback));
        }

        return client;
    }
    // 替换subscribe
    client.subscribe = subscribe;
};

// 替换client的发送函数，内置替换topic和替换callback
export const replacePublish = (client: MqttClient, clientId: string) => {
    const nativePublish = client.publish.bind(client);
    // 重载
    function publish(topic: string, message: string | Buffer, opts: IClientPublishOptions, callback?: PacketCallback): MqttClient;
    function publish(topic: string, message: string | Buffer, callback?: PacketCallback): MqttClient;
    // 实现重载
    function publish(topic: string, message: string | Buffer, optsOrCb?: IClientPublishOptions | PacketCallback, callback?: PacketCallback) {
        // topic替换id
        let newTopic = topic;
        if (typeof topic === 'string') {
            newTopic = replaceTopic({ topic, clientId });
        }

        // 执行原生publish函数，并替换callback
        const innerCb = () => {
            console.log(`已发送: ${newTopic}`);
            console.log(message);
        };
        if (typeof optsOrCb === 'function' || typeof optsOrCb === 'undefined') {
            nativePublish(newTopic, message, replaceCallback(innerCb, optsOrCb));
        } else {
            nativePublish(newTopic, message, optsOrCb, replaceCallback(innerCb, callback));
        }

        return client;
    }
    // 替换publish
    client.publish = publish;
};
