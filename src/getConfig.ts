import fs from 'fs';
import { getRecord } from './utils.js';

// 获取本地配置文件
const getConfig = () => {
    try {
        const record = getRecord('获取配置文件');

        record.start();

        const configText = fs.readFileSync('./config.json', 'utf-8');

        const config = (() => {
            const configJSON = (() => {
                try {
                    return JSON.parse(configText);
                } catch (e) {
                    throw new Error('config.json 解析错误');
                }
            })();

            if (typeof configJSON.suposHost !== 'string') throw new Error('config.json suposHost 字段不存在或者格式错误');
            if (typeof configJSON.username !== 'string') throw new Error('config.json username 字段不存在或者格式错误');
            if (typeof configJSON.password !== 'string') throw new Error('config.json password 字段不存在或者格式错误');
            if (typeof configJSON.appName !== 'string') throw new Error('config.json appName 字段不存在或者格式错误');
            if (typeof configJSON.appConfig !== 'string') throw new Error('config.json appConfig 字段不存在或者格式错误');

            return {
                suposHost: configJSON.suposHost as string,
                username: configJSON.username as string,
                password: configJSON.password as string,
                appName: configJSON.appName as string,
                appConfig: configJSON.appConfig as string,
            };
        })();

        record.end();

        return config;
    } catch (e) {
        throw new Error(`config.json 获取错误: ${(e as Error).message}`);
    }
};

export default getConfig;
