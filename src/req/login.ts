import { getRecord, gotInstance } from '../utils.js';

type LoginProps = { suposHost: string; username: string; password: string };

// 登录Supos
const login = async ({ suposHost, username, password }: LoginProps) => {
    const record = getRecord('登录Supos');

    record.start();

    const loginReq = await gotInstance(`${suposHost}/inter-api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ userName: username, password: password, forceLogin: true }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });

    const supOsTicket = JSON.parse(loginReq.body)['ticket'];

    record.end();

    return { supOsTicket };
};

export default login;
