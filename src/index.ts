import * as readline from 'readline';
import process from 'process';
import chalk from 'chalk';
import getAppZip from './getAppZip.js';
import getConfig from './getConfig.js';
import login from './req/login.js';
import uninstallApp from './req/uninstallApp.js';
import uploadApp from './req/uploadApp.js';
import installApp from './req/installApp.js';

(async () => {
    try {
        // 读取当前文件夹的安装包
        const { file, uploadInfo } = getAppZip();
        // 配置
        const { suposHost, username, password, appName, isdmBackEndIp } = getConfig();
        // 登录
        const { supOsTicket } = await login({ suposHost, username, password });
        // 卸载
        await uninstallApp({ suposHost, supOsTicket, appName });
        // 上传
        await uploadApp({ suposHost, supOsTicket, uploadInfo, file });
        // 安装
        await installApp({ suposHost, supOsTicket, appName, isdmBackEndIp });
    } catch (e) {
        console.log(chalk.red(String(e)));
    }
})().then(() => {
    // 按任意键退出
    readline
        .createInterface({
            input: process.stdin,
            output: process.stdout,
        })
        .question(`按任意键退出...`, () => {
            process.exit(0);
        });
});
