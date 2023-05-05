import proxyAddressJSON from '../../webpack/conf/proxyAddress.json';
import type { ProxyOBJ, ProxyKey } from './types';
import proxyJSON from '../../webpack/conf/proxy.json';

// 获取代理前缀
export const getProxyPrefix = () => {
    const obj: ProxyOBJ = {} as ProxyOBJ;
    Object.entries(proxyJSON).forEach(([k, v]) => {
        obj[k as ProxyKey] = v.prefix;
    });
    return obj;
};

// 因为 import 和 require 的导出不能混合使用，这边重新写一个工具函数
// 读取 本地配置（config-local） 的 mqtt 地址下标
const getMqttDevIndex = () => {
    try {
        const { mqttDevIndex } = require('../../webpack/config-local');
        return mqttDevIndex;
    } catch (e) {
        return undefined;
    }
};

// 获取 mqtt dev 环境的连接地址
export const getMqttDevAddress = () => {
    const host = Object.keys(proxyAddressJSON.mqtt)[getMqttDevIndex() || 0];
    return `ws://${host}/mqtt`;
};
