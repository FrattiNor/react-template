import { colorMap, gotInstance } from '../utils.js';
import qs from 'qs';

const AppStatusMap = {
    NOT_INSTALL: '待安装',
    INSTALLING: '安装中',
    STOPPED: '已停止',
    RUNNING: '运行中',
    STARTING: '正在启动',
    STOPPING: '正在停止',
    START_WAITING: '等待启动',
    STOP_WAITING: '等待停止',
    START_FAIL: '启动失败',
};

type AppStatus = keyof typeof AppStatusMap;

type App = {
    name: string;
    appId: string;
    showName: string;
    runStatus: AppStatus;
    packageId: string;
};

type GetAppProps = {
    suposHost: string;
    supOsTicket: string;
    appName: string;
    loopCount?: number; // 循环获取App时，用于区分是第几次打印
};

export const getAppStatusText = (runStatus: string) => AppStatusMap[runStatus as AppStatus] ?? runStatus;

// 通过接口 获取当前App的状态
const getApp = async ({ suposHost, supOsTicket, appName, loopCount }: GetAppProps) => {
    // 接口获取App列表【前100条】【暂时不考虑有超过100个App的情况】
    const appListReq = await gotInstance(`${suposHost}/inter-api/installer/v3/apps`, {
        method: 'GET',
        searchParams: qs.stringify({ pageNo: 1, pageSize: 100, order: 'name' }),
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${supOsTicket}`,
        },
    });
    // App列表
    const appList = JSON.parse(appListReq.body)['list'] as App[];

    // 遍历对比AppName获取当前App
    const app = appList.find((item) => item.name === appName);

    // 循环获取App时的打印Text，不存在时为空字符串
    const loopCountText = typeof loopCount === 'number' && loopCount > 1 ? `(${loopCount})` : '';

    // 打印App状态
    if (!app) {
        console.log(colorMap.magenta(`App不存在` + loopCountText));
    } else {
        console.log(colorMap.magenta(`当前App状态: ${getAppStatusText(app.runStatus)}` + loopCountText));
    }

    return { app };
};

type LoopAppProps = {
    suposHost: string;
    supOsTicket: string;
    appName: string;
    condition: (app?: App) => boolean;
    delayTime?: number; // 请求完成延迟时间
    maxLoopTime?: number; // 最大循环时间
};

// 循环获取App直到condition条件满足为止
const loopApp = async ({ suposHost, supOsTicket, appName, condition, delayTime = 2000, maxLoopTime = 10 * 60 * 1000 }: LoopAppProps) => {
    console.log(colorMap.cyan(`开启循环获取App状态，循环间隔${delayTime / 1000}s`));

    let loopCount = 1;

    // 开始循环时间【设置一个最大循环时间，避免无限循环】
    const startTime = new Date().valueOf();

    // 无限循环即可，满足条件通过break跳出循环
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // 接口获取App
        const { app } = await getApp({ suposHost, supOsTicket, appName, loopCount });

        // 如果App不存在，抛出错误
        if (!app) throw new Error('App不存在');

        // 执行判断条件，如果为true，通过break跳出循环
        if (condition(app)) break;

        // 延迟进入下次循环，避免请求太快
        await new Promise((res) => {
            setTimeout(() => {
                res(0);
            }, delayTime);
        });

        // 如果循环时间超过10分钟，抛出错误
        const newTime = new Date().valueOf();
        if (newTime > startTime + maxLoopTime) {
            console.log(app);
            throw new Error('循环超时');
        }

        // 增加循环计数器
        loopCount++;
    }
};

export { getApp, loopApp };
