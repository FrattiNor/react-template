import { getMqttProxy } from '@proxy/index';

export const isDev = process.env.NODE_ENV === 'development';
export const mqttDevUrl = getMqttProxy();
