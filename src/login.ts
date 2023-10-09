/* eslint-disable no-debugger */
import { getCookie, gotInstance } from './utils.js';

// 前置登录
export const preLogin = async (url: string = 'https://portal.supcon.com/cas-web/login') => {
    const defaultRes = { lt: undefined, JSESSIONID: undefined };

    try {
        // 前置请求
        const preReq = await gotInstance.getInstance()(url, { method: 'POST' });
        // 请求不为200，失败
        if (preReq.statusCode !== 200) return defaultRes;
        // 请求结果不为str，失败
        if (typeof preReq.body !== 'string') return defaultRes;
        const lt = /name="lt" value="(.*)"/.exec(preReq.body)?.[1];
        const JSESSIONID = getCookie('JSESSIONID', preReq.headers['set-cookie']);
        return { lt, JSESSIONID };
    } catch (e) {
        console.log('error', e);
        return defaultRes;
    }
};

const loginPortalUrl = 'https://portal.supcon.com/cas-web/login?service=http://supportal.supcon.com:80/inter-api/auth/v1/third/authorize';

// 获取 ticket
export const loginPortal = async ({ username, password }: { username: string; password: string }) => {
    const defaultRes = { ticket: undefined };

    try {
        const { lt, JSESSIONID } = await preLogin(loginPortalUrl);
        if (lt === undefined || JSESSIONID === undefined) return defaultRes;

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

        let ticket: string | undefined = undefined;
        // 登录请求1
        const loginReq1 = await gotInstance.getInstance()(loginPortalUrl, {
            method: 'POST',
            form: loginBody,
            headers: loginHeader,
            followRedirect: false,
        });
        // 登录请求2
        const nextLocation1 = loginReq1.headers.location;
        if (typeof nextLocation1 === 'string' && nextLocation1 !== '') {
            const loginReq2 = await gotInstance.getInstance()(nextLocation1, {
                method: 'GET',
                followRedirect: false,
            });
            // 登录请求3
            const nextLocation2 = loginReq2.headers.location;
            if (typeof nextLocation2 === 'string' && nextLocation2 !== '') {
                const loginReq3 = await gotInstance.getInstance()(nextLocation2, {
                    method: 'GET',
                    followRedirect: false,
                });
                // 获取登录结果的ticket
                ticket = getCookie('suposTicket', loginReq3.headers['set-cookie']);
            }
        }
        return { ticket };
    } catch (e) {
        console.log('error', e);
        debugger;
        return defaultRes;
    }
};

// const loginEhrUrl = 'https://portal.supcon.com/cas-web/login?service=https://ehr.supcon.com/RedseaPlatform/index';

// // 获取 REDSESSIONID
// export const loginEhr = async ({ username, password }: { username: string; password: string }) => {
//     const defaultRes = { REDSESSIONID: undefined };

//     try {
//         const { lt, JSESSIONID } = await preLogin(loginEhrUrl);
//         if (lt === undefined || JSESSIONID === undefined) return defaultRes;

//         // 登录请求体
//         const loginBody = {
//             portal_username: username,
//             password: btoa(password),
//             username: username,
//             _eventId: 'submit',
//             veCode: '',
//             lt,
//         };
//         // 登录请求头
//         const loginHeader = {
//             Cookie: `JSESSIONID=${JSESSIONID};`,
//         };

//         let REDSESSIONID = undefined;
//         // 登录请求
//         await gotInstance.post(loginEhrUrl, transformObjToFormData(loginBody, 'URLSearchParams'), {
//             headers: loginHeader,
//             beforeRedirect(options) {
//                 // 登录会经过多次的302或301，有必要可以从中获取信息
//                 const cookieArr = options.headers?.['set-cookie'];
//                 if (Array.isArray(cookieArr)) {
//                     cookieArr.forEach((item) => {
//                         const id = /REDSESSIONID=(.*?);/.exec(item)?.[1];
//                         if (typeof id === 'string' && id !== '') {
//                             REDSESSIONID = id;
//                         }
//                     });
//                 }
//             },
//         });
//         // 获取登录结果的REDSESSIONID
//         return { REDSESSIONID };
//     } catch (e) {
//         console.log('error', e);
//         return defaultRes;
//     }
// };
