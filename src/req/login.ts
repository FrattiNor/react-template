import { getRecord, gotInstance } from '../utils.js';

// 登录
const login = async ({ suposHost, username, password }: { suposHost: string; username: string; password: string }) => {
    const record = getRecord('登录');

    record.start();

    const loginReq = await gotInstance(`${suposHost}/inter-api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ userName: username, password: password, forceLogin: true }),
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    });

    record.end();

    const supOsTicket = JSON.parse(loginReq.body)['ticket'];

    return { supOsTicket };
};

export default login;
