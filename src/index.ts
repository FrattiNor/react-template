import getAppZip from './getAppZip.js';
import getConfig from './getConfig.js';
import login from './req/login.js';
import uninstallApp from './req/uninstallApp.js';
import uploadApp from './req/uploadApp.js';
import installApp from './req/installApp.js';
import clearAppZip from './clearAppZip.js';
import { colorMap, getTotalRecord } from './utils.js';

// 当前Supos版本
// V5.00.02.00-24062008-M
(async () => {
    try {
        console.log(colorMap.cyan('SuposApp安装助手'));
        console.log(colorMap.cyan(`当前适配版本: V5.00.02.00-24062008-M\n`));

        const totalRecord = getTotalRecord();

        totalRecord.start();

        // 读取当前文件夹的安装包
        const { file, uploadInfo, AppZipName } = getAppZip();
        // 读取配置
        const { suposHost, username, password, appName, appConfig } = getConfig();
        // 登录
        const { supOsTicket } = await login({ suposHost, username, password });
        // 卸载
        await uninstallApp({ suposHost, supOsTicket, appName });
        // 上传
        await uploadApp({ suposHost, supOsTicket, uploadInfo, file });
        // 安装
        await installApp({ suposHost, supOsTicket, appName, appConfig });
        // 清除
        clearAppZip({ AppZipName });

        totalRecord.end();
    } catch (e) {
        console.log(colorMap.red(String(e)));
    }
})();
