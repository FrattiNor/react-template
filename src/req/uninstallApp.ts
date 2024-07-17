import { getRecord, gotInstance } from '../utils.js';
import qs from 'qs';
import { getApp, loopApp } from './getApp.js';

// 根据App状态卸载App，直到App列表不存在App
const uninstallApp = async ({ suposHost, supOsTicket, appName }: { suposHost: string; supOsTicket: string; appName: string }) => {
    const { app } = await getApp({ suposHost, supOsTicket, appName });

    const del = async ({ packageId }: { packageId: string }) => {
        const record = getRecord('删除');

        record.start();

        await gotInstance(`${suposHost}/inter-api/installer/v3/packages/delete`, {
            method: 'DELETE',
            searchParams: qs.stringify({
                packageIds: packageId,
                isAppManager: true,
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${supOsTicket}`,
            },
        });

        record.end();
    };

    const uninstall = async ({ appId }: { appId: string }) => {
        const record = getRecord('卸载');

        record.start();

        await gotInstance(`${suposHost}/inter-api/installer/v3/apps/batch/uninstall`, {
            method: 'POST',
            body: JSON.stringify({ appIdList: [appId], delRbac: false }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${supOsTicket}`,
            },
        });

        record.end();
    };

    const stop = async ({ appId, appShowName }: { appId: string; appShowName: string }) => {
        const record = getRecord('停止');

        record.start();

        // stop为异步接口，创建了任务
        await gotInstance(`${suposHost}/inter-api/installer/v1/apps/tasks`, {
            method: 'POST',
            body: JSON.stringify({ tasks: [{ appId: appId, appShowName: appShowName, taskType: 'STOP' }] }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${supOsTicket}`,
            },
        });
        // 遍历直到task结束
        await loopApp({ suposHost, supOsTicket, appName, condition: (_app) => _app.runStatus === 'STOPPED' });

        record.end();
    };

    if (!app) {
        return;
    }
    if (app.runStatus === 'NOT_INSTALL') {
        await del({ packageId: app.packageId });
        return;
    }
    if (app.runStatus === 'STOPPED') {
        await uninstall({ appId: app.appId });
        return;
    }
    if (app.runStatus === 'RUNNING') {
        await stop({ appId: app.appId, appShowName: app.showName });
        await uninstall({ appId: app.appId });
        return;
    }
    throw new Error(`未知的App状态: ${app.runStatus}`);
};

export default uninstallApp;
