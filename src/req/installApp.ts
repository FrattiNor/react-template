import { colorMap, getRecord, gotInstance } from '../utils.js';
import qs from 'qs';
import { getApp, loopApp } from './getApp.js';

type InstallAppProps = {
    suposHost: string;
    supOsTicket: string;
    appName: string;
    appConfig: string;
};

// 安装App
const installApp = async ({ suposHost, supOsTicket, appName, appConfig }: InstallAppProps) => {
    // 获取一次App
    console.log(colorMap.cyan(`获取App状态`));
    const { app } = await getApp({ suposHost, supOsTicket, appName });
    console.log('');

    // 如果App不存在，抛出错误
    if (!app) throw new Error('App不存在');

    // 执行检查安装包接口
    await (async () => {
        const record = getRecord('检查安装包');

        record.start();

        await gotInstance(`${suposHost}/inter-api/installer/v3/packages/quota/check`, {
            method: 'GET',
            searchParams: qs.stringify({ packageId: app.packageId }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${supOsTicket}`,
            },
        });

        record.end();
    })();

    // 执行配置环境变量接口
    await (async () => {
        const record = getRecord('配置环境变量');

        record.start();

        await gotInstance(`${suposHost}/inter-api/installer/v3/apps/install/config`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${supOsTicket}`,
            },
            body: JSON.stringify({ packageId: app.packageId, config: appConfig, configId: '' }),
        });

        record.end();
    })();

    // 执行安装App接口
    await (async () => {
        const record = getRecord('安装App');

        record.start();

        await gotInstance(`${suposHost}/inter-api/installer/v3/apps/install?packageId=4485444391722816&configId=`, {
            method: 'GET',
            searchParams: qs.stringify({
                packageId: app.packageId,
                configId: '',
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${supOsTicket}`,
            },
        });

        // 【接口为异步接口】
        // 需要遍历直到App状态变为STOPPED结束
        await loopApp({ suposHost, supOsTicket, appName, condition: (_app) => _app?.runStatus === 'STOPPED', delayTime: 5000 });

        record.end();
    })();

    // 执行启动App接口
    await (async () => {
        const record = getRecord('启动App');

        record.start();

        await gotInstance(`${suposHost}/inter-api/installer/v1/apps/tasks`, {
            method: 'POST',
            body: JSON.stringify({ tasks: [{ appId: app.appId, appShowName: app.showName, taskType: 'START' }] }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${supOsTicket}`,
            },
        });

        // 【接口为异步接口】
        // 需要遍历直到App状态变为RUNNING结束
        await loopApp({ suposHost, supOsTicket, appName, condition: (_app) => _app?.runStatus === 'RUNNING' });

        record.end();
    })();
};

export default installApp;
