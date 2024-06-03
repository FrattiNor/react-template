import fs from 'fs';

// 获取本地配置文件
const getConfig = () => {
    const config = fs.readFileSync('./config.json', 'utf-8');

    return (() => {
        const configJSON = (() => {
            try {
                return JSON.parse(config);
            } catch (e) {
                throw new Error('config.json 解析错误');
            }
        })();

        if (typeof configJSON.suposHost !== 'string') throw new Error('config.json suposHost 字段不存在或者格式错误');
        if (typeof configJSON.username !== 'string') throw new Error('config.json username 字段不存在或者格式错误');
        if (typeof configJSON.password !== 'string') throw new Error('config.json password 字段不存在或者格式错误');
        if (typeof configJSON.appName !== 'string') throw new Error('config.json appName 字段不存在或者格式错误');
        if (typeof configJSON.isdmBackEndIp !== 'string') throw new Error('config.json isdmBackEndIp 字段不存在或者格式错误');

        return {
            suposHost: configJSON.suposHost as string,
            username: configJSON.username as string,
            password: configJSON.password as string,
            appName: configJSON.appName as string,
            isdmBackEndIp: configJSON.isdmBackEndIp as string,
        };
    })();
};

export default getConfig;
