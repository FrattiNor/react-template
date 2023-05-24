import { connect, IClientOptions, MqttClient, OnMessageCallback } from 'mqtt';
import { useEffect, useState } from 'react';
import { isDev, mqttDevUrl } from '@/env';
import useMqttUrl from './useMqttUrl';
import { getWill } from './utils';
import { nanoid } from 'nanoid';

type OnConnect = ({ client, clientId }: { client: MqttClient; clientId: string }) => void;
type OnMessage = (topic: string, payload: any) => void;

type Option = Omit<IClientOptions, 'will'> & {
    will?: string;
    onMessage?: OnMessage;
    onConnect?: OnConnect;
};

const useMqtt = (option: Option) => {
    const mqttUrl = useMqttUrl();
    const url = isDev ? mqttDevUrl : mqttUrl;
    const [clientId] = useState(nanoid());
    const { onConnect, onMessage, will, ...restOption } = option;
    const clientOption = { ...restOption, will: getWill(clientId, will) };
    const [client] = useState(connect(url, { clientId, ...clientOption }));

    useEffect(() => {
        client.on('connect', () => {
            console.log(`mqtt: ${url} [connect]`);
            if (onConnect) {
                onConnect({ client, clientId });
            }
        });

        client.on('disconnect', () => {
            console.log(`mqtt: ${url} [disconnect]`);
        });

        client.on('close', () => {
            console.log(`mqtt: ${url} [close]`);
        });

        client.on('end', () => {
            console.log(`mqtt: ${url} [end]`);
        });

        client.on('offline', () => {
            console.log(`mqtt: ${url} [offline]`);
        });

        client.on('error', (e) => {
            console.log(`mqtt: ${url} [error]`, e);
        });

        // 取消挂载主动关闭mqtt
        return () => {
            client.end(true);
        };
    }, []);

    // 更新 onMessage
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
