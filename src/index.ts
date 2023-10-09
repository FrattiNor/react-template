import { loginPortal } from './login.js';
// import { getTime } from './time';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

const init = async () => {
    console.log(await loginPortal({ username: 'sunzhibin', password: 'Aa-=-=-=123' }));
    // if (ticket !== undefined) getTime({ month: 9 }, ticket);
};

init();
