import { colorMap, getRecord, gotInstance } from '../utils.js';
import qs from 'qs';
import { getApp, getAppStatusText, loopApp } from './getApp.js';

type DelAppProps = { packageId: string; suposHost: string; supOsTicket: string };

// 删除App
const delApp = async ({ packageId, supOsTicket, suposHost }: DelAppProps) => {
    const record = getRecord('删除App');

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

type _UninstallAppProps = { appId: string; suposHost: string; supOsTicket: string };

// 卸载App
const _uninstallApp = async ({ appId, supOsTicket, suposHost }: _UninstallAppProps) => {
    const record = getRecord('卸载App');

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

type StopAppProps = {
    appId: string;
    appShowName: string;
    suposHost: string;
    supOsTicket: string;
    appName: string;
};

// 停止App
const stopApp = async ({ appId, appShowName, supOsTicket, suposHost, appName }: StopAppProps) => {
    const record = getRecord('停止App');

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
    // 【接口为异步接口】
    // 需要遍历直到App状态变为STOPPED结束
    await loopApp({ suposHost, supOsTicket, appName, condition: (_app) => _app?.runStatus === 'STOPPED' });

    record.end();
};

type UninstallAppProps = { suposHost: string; supOsTicket: string; appName: string };

// 笼统的卸载App【包含删除、卸载、停止并卸载】
// 根据App状态卸载App，直到App列表不存在App
const uninstallApp = async ({ suposHost, supOsTicket, appName }: UninstallAppProps) => {
    console.log(colorMap.cyan(`获取App状态`));
    const { app } = await getApp({ suposHost, supOsTicket, appName });
    console.log('');

    // App不存在，不需要卸载，直接返回
    if (!app) {
        return;
    }

    // App未安装，调用删除接口
    if (app.runStatus === 'NOT_INSTALL') {
        await delApp({ packageId: app.packageId, suposHost, supOsTicket });
        return;
    }

    // App停止状态，执行卸载接口
    if (app.runStatus === 'STOPPED') {
        await _uninstallApp({ appId: app.appId, suposHost, supOsTicket });
        return;
    }

    // App运行中，执行停止并卸载
    if (app.runStatus === 'RUNNING') {
        await stopApp({ appId: app.appId, appShowName: app.showName, suposHost, supOsTicket, appName });
        await _uninstallApp({ appId: app.appId, suposHost, supOsTicket });
        return;
    }

    // 其余状态不执行，避免不可预判错误【像INSTALLING、STOPPING、STOP_WAITING等】，并抛出错误
    throw new Error(`未知的App状态: ${getAppStatusText(app.runStatus)}`);
};

export default uninstallApp;
