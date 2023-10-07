/* eslint-disable @typescript-eslint/no-var-requires */
import proxyAddressJSON from './proxyAddress.json';
import proxyJSON from './proxy.json';

const getMqttDevIndex = () => {
    try {
        const { mqttDevIndex } = require('./local');
        return mqttDevIndex;
    } catch (e) {
        return 1;
    }
};

const getProxyPort = () => {
    try {
        const { proxyPort } = require('./local');
        return proxyPort;
    } catch (e) {
        return 5000;
    }
};

const getProxyIndex = () => {
    try {
        const { proxyIndex } = require('./local');
        return proxyIndex;
    } catch (e) {
        return 1;
    }
};

// 获取mqtt代理地址
export const getMqttProxy = () => {
    return Object.keys(proxyAddressJSON.mqtt)[getMqttDevIndex()];
};

// 获取本地服务端口
export const getPort = () => {
    return getProxyPort();
};

// 获取http代理地址
const getHttpProxy = () => {
    return Object.keys(proxyAddressJSON.http)[getProxyIndex()];
};

// 获取vite代理对象
export const getProxyObj = () => {
    const obj: Record<string, unknown> = {};
    Object.values(proxyJSON).forEach(({ prefix, port }) => {
        obj[prefix] = {
            changeOrigin: true,
            target: 'http://' + getHttpProxy() + `:${port}`,
            rewrite: (path: string) => {
                return path.replace(new RegExp(`^${prefix}`), '');
            },
        };
    });
    return obj;
};
