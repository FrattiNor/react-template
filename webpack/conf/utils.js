const proxyAddressJSON = require('./proxyAddress.json');
const proxyJSON = require('./proxy.json');

// 读取 本地配置（config-local） 的 http 代理地址下标
const getProxyIndex = () => {
    try {
        const { proxyIndex } = require('./config-local');
        return proxyIndex;
    } catch (e) {
        return undefined;
    }
};

// 读取 本地配置（config-local） 的 mqtt 地址下标
const getMqttDevIndex = () => {
    try {
        const { mqttDevIndex } = require('./config-local');
        return mqttDevIndex;
    } catch (e) {
        return undefined;
    }
};

// 读取 branch 里分支信息
const getBranch = () => {
    try {
        const { branch } = require('./branch');
        return branch;
    } catch (e) {
        return undefined;
    }
};

// 读取 本地配置（config-local） 的端口设置
const getPort = () => {
    try {
        const { proxyPort } = require('./config-local');
        return proxyPort;
    } catch (e) {
        return undefined;
    }
};

// 获取打包文件的文件前缀（js，css，assets）
const getExportFilePrefix = () => {
    const jsPrefix = 'common/js';
    const cssPrefix = 'common/css';
    const assetsPrefix = 'common/assets';

    return { jsPrefix, cssPrefix, assetsPrefix };
};

// 获取代理地址
const getProxyAddress = () => {
    return Object.keys(proxyAddressJSON.http)[getProxyIndex() || 0];
};

// 获取代理地址 Name
const getProxyName = () => {
    return proxyAddressJSON.http[getProxyAddress()];
};

// 获取 mqtt dev 环境的连接地址
const getMqttDevAddress = () => {
    return Object.keys(proxyAddressJSON.mqtt)[getMqttDevIndex() || 0];
};

// 获取 mqtt 地址 Name
const getMqttDevName = () => {
    return proxyAddressJSON.mqtt[getMqttDevAddress()];
};

// 获取 webpack 的代理对象
const getWebpackProxyObj = () => {
    const obj = {};

    Object.values(proxyJSON).forEach(({ prefix, proxy, port }) => {
        obj[prefix] = {
            target: 'http://' + getProxyAddress() + `:${port}`,
            ...proxy,
        };
    });
    return obj;
};

module.exports = {
    getBranch,
    getPort,
    getExportFilePrefix,
    getProxyAddress,
    getProxyName,
    getMqttDevAddress,
    getMqttDevName,
    getWebpackProxyObj,
};
