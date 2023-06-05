/* eslint-disable @typescript-eslint/no-var-requires */
import proxyAddressJSON from './proxyAddress.json';
import proxyJSON from './proxy.json';
// "10.50.0.40": "40 测试环境",
// "10.50.0.49": "49 测试环境",
// "192.168.184.63": "大鹏",
// "192.168.184.72": "晨瀚",
// "192.168.184.73": "子轩",
// "192.168.184.70": "蒋逸嘉"
const proxyIndex = 1;
// "10.50.0.40:30326": "40 测试环境",
// "10.50.0.49:30326": "49 测试环境",
// "192.168.176.75:8083": "大鹏",
// "192.168.176.78:8083": "晨瀚"
const mqttDevIndex = 1;
// 端口
const proxyPort = 5000;

// 获取mqtt代理地址
export const getMqttProxy = () => {
    return Object.keys(proxyAddressJSON.mqtt)[mqttDevIndex];
};

// 获取本地服务端口
export const getPort = () => {
    return proxyPort;
};

// 获取http代理地址
const getHttpProxy = () => {
    return Object.keys(proxyAddressJSON.http)[proxyIndex];
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
