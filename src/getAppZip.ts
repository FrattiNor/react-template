import AdmZip from 'adm-zip';
import YAML from 'yaml';
import fs from 'fs';
import { getRecord } from './utils.js';

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
        appId: '',
        appName: appYamlJSON.name,
        appShowName: appYamlJSON.showName,
        version: appYamlJSON.appVersion,
        vendorName: appYamlJSON.vendorName,
        packageName: AppZipName,
        source: 'LOCAL',
        deployMode: appYamlJSON.deployMode,
        tenantId: '',
        supportUndisturbedVersion: dependencyYamlJSON.dependencies[0].supportUndisturbedVersion,
        minUndisturbedVersion: dependencyYamlJSON.dependencies[0].minUndisturbedVersion,
        maxUndisturbedVersion: dependencyYamlJSON.dependencies[0].maxUndisturbedVersion,
        apiVersion: appYamlJSON.apiVersion,
        indexUrl: appYamlJSON.indexUrl,
    };

    record.end();

    return { file: fs.createReadStream(`./${AppZipName}`), uploadInfo, AppZipName };
};

export default getAppZip;
