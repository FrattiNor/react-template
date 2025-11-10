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

            if (typeof configJSON.directory !== 'string') throw new Error('config.json directory 字段不存在或者格式错误');
            if (typeof configJSON.filename !== 'string') throw new Error('config.json filename 字段不存在或者格式错误');
            if (typeof configJSON.username !== 'string') throw new Error('config.json username 字段不存在或者格式错误');
            if (typeof configJSON.password !== 'string') throw new Error('config.json password 字段不存在或者格式错误');
            if (typeof configJSON.host !== 'string') throw new Error('config.json host 字段不存在或者格式错误');
            if (typeof configJSON.clearDep !== 'boolean') throw new Error('config.json clearDep 字段不存在或者格式错误');
            if (typeof configJSON.deepClear !== 'boolean') throw new Error('config.json deepClear 字段不存在或者格式错误');

            return {
                directory: configJSON.directory as string,
                filename: configJSON.filename as string,
                username: configJSON.username as string,
                password: configJSON.password as string,
                host: configJSON.host as string,
                clearDep: configJSON.clearDep as boolean,
                deepClear: configJSON.deepClear as boolean,
            };
        })();

        record.end();

        return config;
    } catch (e) {
        throw new Error(`config.json 获取错误: ${(e as Error).message}`);
    }
};

export default getConfig;
