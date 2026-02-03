/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

// 获取本地配置文件
const getConfig = () => {
    try {
        const configText = fs.readFileSync('./config.json', 'utf-8');

        const config = (() => {
            const configJSON = (() => {
                try {
                    return JSON.parse(configText);
                } catch (e) {
                    throw new Error('config.json 解析错误');
                }
            })();

            if (typeof configJSON.appId !== 'string') throw new Error('config.json appId 字段不存在或者格式错误');
            if (typeof configJSON.parentId !== 'string') throw new Error('config.json parentId 字段不存在或者格式错误');
            if (typeof configJSON.suposHost !== 'string') throw new Error('config.json suposHost 字段不存在或者格式错误');
            if (typeof configJSON.ticket !== 'string') throw new Error('config.json ticket 字段不存在或者格式错误');
            if (typeof configJSON.width !== 'number') throw new Error('config.json width 字段不存在或者格式错误');
            if (typeof configJSON.height !== 'number') throw new Error('config.json height 字段不存在或者格式错误');

            return {
                appId: configJSON.appId,
                parentId: configJSON.parentId,
                suposHost: configJSON.suposHost,
                ticket: configJSON.ticket,
                width: configJSON.width,
                height: configJSON.height,
            };
        })();

        return config;
    } catch (e) {
        throw new Error(`config.json 获取错误: ${e.message}`);
    }
};

module.exports = { getConfig };
