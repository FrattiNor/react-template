import { connect, IClientOptions, MqttClient, OnMessageCallback } from 'mqtt';
import { useEffect, useMemo, useState } from 'react';
import { isDev, mqttDevUrl } from '@/env';
import useMqttUrl from './useMqttUrl';
import { getWill, replacePublish, replaceSubscribe } from './utils';
import { nanoid } from 'nanoid';

type OnConnect = ({ client, clientId }: { client: MqttClient; clientId: string }) => void;
type OnMessage = (topic: string, payload: any) => void;
type Option = Omit<IClientOptions, 'will'> & {
    will?: string;
    onMessage?: OnMessage;
    onConnect?: OnConnect;
};

const useMqtt = (option: Option) => {
    // url
    const mqttUrl = useMqttUrl();
    const url = isDev ? mqttDevUrl : mqttUrl;
    // id
    const [clientId] = useState(nanoid());
    // option
    const { onConnect, onMessage, will, ...restOption } = option;
    const clientOption = { ...restOption, will: getWill(clientId, will) };
    // client
    const nativeClient = useMemo(() => connect(url, { clientId, ...clientOption }), []);
    const client = useMemo(() => {
        replaceSubscribe(nativeClient, clientId);
        replacePublish(nativeClient, clientId);
        return nativeClient;
    }, [nativeClient]);
    // 初始化函数，onConnect不支持更新
    useEffect(() => {
        client.on('connect', () => {
            console.log(`已连接: ${url}`);
            if (onConnect) {
                onConnect({ client, clientId });
            }
        });

        client.on('disconnect', () => {
            console.log(`已断开连接: ${url}`);
        });

        client.on('close', () => {
            console.log(`已关闭: ${url}`);
        });

        client.on('end', () => {
            console.log(`已结束: ${url}`);
        });

        client.on('offline', () => {
            console.log(`已离线: ${url}`);
        });

        client.on('error', (e) => {
            console.log(`发送错误: ${url}`, e);
        });

        // 取消挂载主动关闭mqtt
        return () => {
            client.end(true);
        };
    }, []);
    // 更新onMessage
    useEffect(() => {
        if (onMessage) {
            const handleOnMessage: OnMessageCallback = (topic, payload) => {
                try {
                    const res = JSON.parse(payload.toString('utf-8'));
                    console.log('onMessage', res);
                    onMessage(topic, res);
                } catch (e) {
                    console.error(e);
                }
            };

            client.addListener('message', handleOnMessage);

            return () => {
                client.removeListener('message', handleOnMessage);
            };
        }
    }, [onMessage]);

    return client;
};

export default useMqtt;
