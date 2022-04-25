import { useCallback, useEffect, useState } from 'react';
import type { Client, IClientOptions, ISubscriptionMap, IClientPublishOptions, PacketCallback } from 'mqtt';
import { connect } from 'mqtt';

// =========== QoS值（Quality of Service,服务质量）==============
// level 0：最多一次的传输
// level 1：至少一次的传输，(鸡肋)
// level 2： 只有一次的传输

// ============ IClientOptions ==============
// {
//     keepalive: 60, // 默认为 60 秒，设置为 0 时禁止
//     clientId: `${Math.random()}`, // 'mqttjs_' + Math.random().toString(16).substr(2, 8)
//     protocolVersion: 4, // 默认为 4（v3.1.1）可以修改为 3（v3.1）和 5（v5.0）
//     clean: true, // 断开连接后将清除会话，订阅过的 Topics 也将失效。当设置为 false 时，离线状态下也能收到 QoS 为 1 和 2 的消息
//     reconnectPeriod: 1000, // 重连间隔时间，单位为毫秒，默认为 1000 毫秒，注意：当设置为 0 以后将取消自动重连
//     connectTimeout: 3000, //  连接超时时长，收到 CONNACK 前的等待时间，单位为毫秒，默认 30000 毫秒
//     username: 认证用户名，如果 Broker 要求用户名认证的话，请设置该值
//     password: 认证密码，如果 Broker 要求密码认证的话，请设置该值
//     will: {
//          topic: , // 遗嘱发送的 Topic
//          payload: , // 遗嘱发布的消息
//          QoS: , // 遗嘱发送的 QoS 值
//          retain: , // 遗嘱发布的消息的 retain 标志，是否持久化（等待别人接受消息）
//     },
// }

// ============= client 事件回调 =================

// 连接
// client.on('connect', () => {});

// 重连
// client.on('reconnect', () => {});

// 断开连接
// client.on('close', () => {});

// 收到服务器发来的断连，MQTT5.0
// client.on('disconnect', () => {});

// 下线
// client.on('offline', () => {});

// 触发错误
// client.on('error', () => {});

// 收到消息
// client.on('message', () => {});

// ============= client 主动事件 =============

// 主动发送消息
// client.publish(topic, message, [options], [callback])

// 订阅一个或多个topic
// client.subscribe(topic/topic array/topic object, [options], [callback])

// 取消订阅一个或多个主题
// client.unsubscribe(topic/topic array, [options], [callback])

// 主动关闭客户端
// client.end([force], [options], [callback])

type opt = {
    options?: IClientOptions;
    topics: ISubscriptionMap;
    onMessage?: (topic: string, payload: Record<any, any>) => void;
};

type Publish = (topic: string, message: string | Buffer, opts: IClientPublishOptions, callback?: PacketCallback) => void;
type Publish2 = (topic: string, message: string | Buffer, callback?: PacketCallback) => void;

const useMqtt = (url: string, opt: opt) => {
    const { topics, onMessage = null, options } = opt;
    const [client, setClient] = useState<Client | null>(null);

    // 初始化mqtt通用处理函数
    const initClientHandle = useCallback(
        (_client: Client) => {
            _client.on('connect', () => {
                console.log(`mqtt: ${url}已连接`);
            });

            _client.on('disconnect', () => {
                console.log(`mqtt: ${url}已断开 disconnect`);
            });

            _client.on('close', () => {
                console.log(`mqtt: ${url}已关闭 close`);
            });

            _client.on('end', () => {
                console.log(`mqtt: ${url}已关闭 end`);
            });

            _client.on('offline', () => {
                console.log(`mqtt: ${url}已下线`);
            });

            _client.on('error', (e) => {
                console.log(`mqtt: ${url}报错`, e);
            });
        },
        [url],
    );

    // 初始化mqtt
    useEffect(() => {
        const newClient = connect(url, options);

        initClientHandle(newClient);
        setClient(newClient);
    }, [options, url, initClientHandle]);

    // 取消挂载主动关闭mqtt
    useEffect(() => {
        return () => {
            if (client !== null) {
                client.end();
            }
        };
    }, [client]);

    // 更新onMessage
    useEffect(() => {
        if (client !== null && onMessage !== null) {
            client.on('message', (topic: string, payload: Buffer) => {
                onMessage(topic, JSON.parse(payload.toString('utf8')));
            });
        }
    }, [client, onMessage]);

    // 订阅topics
    useEffect(() => {
        // 客户端OK【不能用client.connected判断】
        if (client !== null && !client.disconnecting && !client.disconnected) {
            // 获取之前订阅的topics
            const subscribed = { ...(((client as any)?._resubscribeTopics || {}) as ISubscriptionMap) };

            // 遍历topics，对比之前的订阅信息，没有的新订阅，配置不一样的重新订阅
            Object.entries(topics).forEach(([k, v]) => {
                if (subscribed[k]) {
                    if (JSON.stringify(subscribed[k]) !== JSON.stringify(v)) {
                        client.unsubscribe(k, (error: any) => {
                            if (!error) {
                                client.subscribe({ [k]: v });
                            }
                        });
                    }
                } else {
                    client.subscribe({ [k]: v });
                }
            });

            // 遍历之前的订阅，新topics不存在的取消订阅
            Object.keys(subscribed).forEach((k) => {
                if (!topics[k]) {
                    client.unsubscribe(k);
                }
            });
        }
    }, [client, topics]);

    // 主动推送
    const publish: Publish | Publish2 = (topic: string, message: string | Buffer, opts: IClientPublishOptions, callback?: PacketCallback) => {
        if (client !== null && client.connected) {
            client.publish(topic, message, opts, callback);
        }
    };

    return [{ client, publish }];
};

export default useMqtt;
