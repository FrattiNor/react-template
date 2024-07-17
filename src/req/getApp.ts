import chalk from 'chalk';
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

    if (!app) {
        console.log(chalk.rgb(146, 84, 222)(`App不存在`));
    } else {
        console.log(chalk.rgb(146, 84, 222)(`App状态: ${app.runStatus}`));
    }

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
    const startTime = new Date().valueOf();
    let complete = false;
    while (complete === false) {
        const { app } = await getApp({ suposHost, supOsTicket, appName });

        if (!app) throw new Error('App不存在');

        if (condition(app)) {
            complete = true;
            break;
        }

        // 延迟500ms
        await new Promise((res) => {
            setTimeout(() => {
                res(0);
            }, 2000);
        });

        // 超过5分钟
        const newTime = new Date().valueOf();
        if (newTime > startTime + 5 * 60 * 1000) {
            console.log(app);
            throw new Error('循环超时');
        }
    }
};

export { getApp, loopApp };
