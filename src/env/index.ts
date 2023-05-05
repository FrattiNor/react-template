import { getMqttDevAddress, getProxyPrefix } from './utils';
import packages from '../../package.json';
import type { ProxyOBJ } from './types';

// 开发环境 mqtt 连接地址
export const mqttDevAddress = getMqttDevAddress();

// 前端版本 (jenkins打包时会调用buildWithVersion.js修改package.json的版本)
export const version = packages.version;

// 开发环境
export const isDev = process.env.NODE_ENV === 'development';

// 代理前缀
export const proxyPrefix = getProxyPrefix() as ProxyOBJ;
