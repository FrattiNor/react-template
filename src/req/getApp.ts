import { gotInstance } from '../utils.js';
import qs from 'qs';

// 通过接口 获取当前App的状态
const getApp = async ({ suposHost, supOsTicket, appName }: { suposHost: string; supOsTicket: string; appName: string }) => {
    const appListReq = await gotInstance(`${suposHost}/inter-api/installer/v3/apps`, {
        method: 'GET',
        searchParams: qs.stringify({ pageNo: 1, pageSize: 100, order: 'name' }),
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${supOsTicket}`,
        },
    });

    const appList = JSON.parse(appListReq.body)['list'] as any[];
    const app = appList.find((item) => item.name === appName);
    return { app };
};

const loopApp = async ({
    suposHost,
    supOsTicket,
    appName,
    condition,
}: {
    suposHost: string;
    supOsTicket: string;
    appName: string;
    condition: (app: any) => boolean;
}) => {
    let complete = false;
    while (complete === false) {
        const { app } = await getApp({ suposHost, supOsTicket, appName });
        if (!app) throw new Error('App不存在');
        if (condition(app)) complete = true;
        // 延迟500ms
        await new Promise((res) => {
            setTimeout(() => {
                res(0);
            }, 500);
        });
    }
};

export { getApp, loopApp };
