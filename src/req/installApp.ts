import { getRecord, gotInstance } from '../utils.js';
import qs from 'qs';
import { getApp, loopApp } from './getApp.js';

// 上传完成后安装App
const installApp = async ({
    suposHost,
    supOsTicket,
    appName,
    appConfig,
}: {
    suposHost: string;
    supOsTicket: string;
    appName: string;
    appConfig: string;
}) => {
    const installCheckRecord = getRecord('安装检查');
    const configRecord = getRecord('配置');
    const installRecord = getRecord('安装');
    const startRecord = getRecord('启动');

    const { app } = await getApp({ suposHost, supOsTicket, appName });

    if (!app) throw new Error('App不存在');

    installCheckRecord.start();

    // check
    await gotInstance(`${suposHost}/inter-api/installer/v3/packages/quota/check`, {
        method: 'GET',
        searchParams: qs.stringify({
            packageId: app.packageId,
        }),
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${supOsTicket}`,
        },
    });

    installCheckRecord.end();

    configRecord.start();

    // config
    await gotInstance(`${suposHost}/inter-api/installer/v3/apps/install/config`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${supOsTicket}`,
        },
        body: JSON.stringify({ packageId: app.packageId, config: appConfig, configId: '' }),
    });

    configRecord.end();

    installRecord.start();

    // install【异步任务】
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
    // 遍历直到task结束
    await loopApp({ suposHost, supOsTicket, appName, condition: (_app) => _app.runStatus === 'STOPPED' });

    installRecord.end();

    startRecord.start();

    // start【异步任务】
    await gotInstance(`${suposHost}/inter-api/installer/v1/apps/tasks`, {
        method: 'POST',
        body: JSON.stringify({ tasks: [{ appId: app.appId, appShowName: app.showName, taskType: 'START' }] }),
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${supOsTicket}`,
        },
    });
    // 遍历直到task结束
    await loopApp({ suposHost, supOsTicket, appName, condition: (_app) => _app.runStatus === 'RUNNING' });

    startRecord.end();
};

export default installApp;
