/* eslint-disable @typescript-eslint/no-var-requires */
import proxyAddressJSON from './proxyAddress.json';
import proxyJSON from './proxy.json';

// 获取本地服务端口
export const getPort = () => {
    let port = 5000;
    try {
        const { proxyPort } = require('./config-local');
        port = proxyPort;
    } catch (e) {
        /* empty */
    }
    return port;
};

// 获取http代理地址
const getHttpProxy = () => {
    let index = 0;
    try {
        const { proxyIndex } = require('./config-local');
        index = proxyIndex;
    } catch (e) {
        /* empty */
    }
    return Object.keys(proxyAddressJSON.http)[index];
};

// 获取mqtt代理地址
export const getMqttProxy = () => {
    let index = 0;
    try {
        const { mqttDevIndex } = require('./config-local');
        index = mqttDevIndex;
    } catch (e) {
        /* empty */
    }
    return Object.keys(proxyAddressJSON.mqtt)[index];
};

// 获取vite代理对象
export const getProxyObj = () => {
    const obj: Record<string, unknown> = {};
    Object.values(proxyJSON).forEach(({ prefix, port }) => {
        obj[prefix] = {
            changeOrigin: true,
            target: 'http://' + getHttpProxy() + `:${port}`,
            rewrite: (path: string) => path.replace(new RegExp(`^${prefix}`), ''),
        };
    });
    console.log(obj);
    return obj;
};
