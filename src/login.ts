/* eslint-disable no-debugger */
import { getCookie, gotInstance } from './utils.js';
import chalk from 'chalk';

// 前置登录
const preLogin = async (url: string = 'https://portal.supcon.com/cas-web/login') => {
    const defaultRes = { lt: undefined, JSESSIONID: undefined };

    try {
        // 前置请求
        const preReq = await gotInstance(url, { method: 'POST' });
        // 请求不为200，失败
        if (preReq.statusCode !== 200) return defaultRes;
        // 请求结果不为str，失败
        if (typeof preReq.body !== 'string') return defaultRes;
        const lt = /name="lt" value="(.*)"/.exec(preReq.body)?.[1];
        const JSESSIONID = getCookie('JSESSIONID', preReq.headers['set-cookie']);
        return { lt, JSESSIONID };
    } catch (e) {
        console.log(chalk.red('error'));
        console.log(e);
        return defaultRes;
    }
};

const firstLogin = async (url: string, { username, password }: { username: string; password: string }) => {
    const { lt, JSESSIONID } = await preLogin(url);
    if (lt === undefined || JSESSIONID === undefined) return undefined;

    // 登录请求体
    const loginBody = {
        portal_username: username,
        password: btoa(password),
        username: username,
        _eventId: 'submit',
        veCode: '',
        lt,
    };
    // 登录请求头
    const loginHeader = {
        Cookie: `JSESSIONID=${JSESSIONID};`,
    };

    // 登录请求1
    const loginReq1 = await gotInstance(loginPortalUrl, {
        method: 'POST',
        form: loginBody,
        headers: loginHeader,
    });

    return loginReq1;
};

const loginPortalUrl = 'https://portal.supcon.com/cas-web/login?service=http://supportal.supcon.com:80/inter-api/auth/v1/third/authorize';

// 获取 ticket
export const loginPortal = async ({ username, password }: { username: string; password: string }) => {
    const defaultRes = { ticket: undefined };

    try {
        let ticket: string | undefined = undefined;

        const loginReq1 = await firstLogin(loginPortalUrl, { username, password });

        let nextLocation = loginReq1?.headers.location;

        while (typeof nextLocation === 'string' && nextLocation !== '') {
            const nextLoginReq = await gotInstance(nextLocation, {
                method: 'GET',
            });

            nextLocation = nextLoginReq.headers.location;

            ticket = getCookie('suposTicket', nextLoginReq.headers['set-cookie']);

            if (ticket !== undefined) break;
        }
        return { ticket };
    } catch (e) {
        console.log(chalk.red('error'));
        console.log(e);
        return defaultRes;
    }
};

const loginEhrUrl = 'https://portal.supcon.com/cas-web/login?service=https://ehr.supcon.com/RedseaPlatform/index';
const staffIdUrl = 'https://ehr.supcon.com/RedseaPlatform/PtPortal.mc?method=classic';

// 获取 REDSESSIONID
export const loginEhr = async ({ username, password }: { username: string; password: string }) => {
    const defaultRes = { REDSESSIONID: undefined, staff_id: undefined };

    try {
        let staff_id = undefined;
        let REDSESSIONID = undefined;
        // 登录请求1
        const loginReq1 = await firstLogin(loginEhrUrl, { username, password });
        // 登录请求2
        const nextLocation1 = loginReq1?.headers.location;
        if (typeof nextLocation1 === 'string' && nextLocation1 !== '') {
            const loginReq2 = await gotInstance(nextLocation1, {
                method: 'GET',
            });
            // 登录请求3
            const nextLocation2 = loginReq2.headers.location;
            if (typeof nextLocation2 === 'string' && nextLocation2 !== '') {
                const JSESSIONID = getCookie('JSESSIONID', loginReq2.headers['set-cookie']);
                const routeEhr01 = getCookie('routeEhr01', loginReq2.headers['set-cookie']);
                const loginReq3 = await gotInstance(nextLocation2, {
                    method: 'GET',
                    headers: {
                        Cookie: `JSESSIONID=${JSESSIONID}; routeEhr01=${routeEhr01}`,
                    },
                });
                // 获取登录结果的REDSESSIONID
                REDSESSIONID = getCookie('REDSESSIONID', loginReq3.headers['set-cookie']);
            }
        }

        if (REDSESSIONID !== undefined) {
            const staffReq = await gotInstance(staffIdUrl, {
                method: 'GET',
                headers: {
                    Cookie: `REDSESSIONID=${REDSESSIONID};`,
                },
            });
            if (typeof staffReq.body === 'string') {
                staff_id = /staffId: '(.*)'/.exec(staffReq.body)?.[1];
            }
        }

        return { REDSESSIONID, staff_id };
    } catch (e) {
        console.log(chalk.red('error'));
        console.log(e);
        return defaultRes;
    }
};
