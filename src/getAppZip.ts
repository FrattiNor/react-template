import AdmZip from 'adm-zip';
import YAML from 'yaml';
import fs from 'fs';
import { getRecord } from './utils.js';

// const appInfoDemo = {
//     appId: '',
//     appName: 'isdm',
//     appShowName: 'ISDM-frontend',
//     version: '4.00.00.00_20240717_202',
//     vendorName: 'supcon',
//     packageName: 'isdm-frontend_4.00.00.00_20240717_2b02e9324_202.zip',
//     source: 'LOCAL',
//     deployMode: 'INSIDE',
//     tenantId: '',
//     supportUndisturbedVersion: 'true',
//     minUndisturbedVersion: '3.0',
//     maxUndisturbedVersion: '""',
//     apiVersion: 'v4alpha1',
//     indexUrl: '',
// };

// 读取当前文件夹的安装包
const getAppZip = () => {
    const record = getRecord('获取安装包');

    record.start();

    let AppZipName: string | undefined = undefined;
    fs.readdirSync('./').forEach((fileName) => {
        if (fs.statSync(`./${fileName}`).isFile()) {
            if (/isdm-frontend.*\.zip/.test(fileName)) {
                AppZipName = fileName;
            }
        }
    });

    if (!AppZipName) throw new Error('安装包不存在');

    const AppZip = new AdmZip(`./${AppZipName}`);
    const appYamlJSON = YAML.parse(AppZip.readAsText(`app.yaml`));
    const dependencyYamlJSON = YAML.parse(AppZip.readAsText('dependency.yaml'), { schema: 'failsafe' });

    const uploadInfo = {
        appId: '', // AppId
        appName: appYamlJSON.name, // App别名
        appShowName: appYamlJSON.showName, // App名称
        version: appYamlJSON.appVersion, // 版本号
        vendorName: appYamlJSON.vendorName, // 开发者
        packageName: AppZipName, // 安装包名称
        source: 'LOCAL', // 来源 直接填本地安装【LOCAL】
        deployMode: appYamlJSON.deployMode, // 部署方式
        tenantId: '', // 详情-终端
        supportUndisturbedVersion: dependencyYamlJSON.dependencies[0].supportUndisturbedVersion,
        minUndisturbedVersion: dependencyYamlJSON.dependencies[0].minUndisturbedVersion,
        maxUndisturbedVersion: dependencyYamlJSON.dependencies[0].maxUndisturbedVersion,
        apiVersion: appYamlJSON.apiVersion,
        indexUrl: appYamlJSON.indexUrl ?? '',
    };

    record.end();

    return { file: fs.createReadStream(`./${AppZipName}`), uploadInfo, AppZipName };
};

export default getAppZip;
