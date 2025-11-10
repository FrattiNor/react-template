/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');
const { colorMap, getRecord } = require('./utils.cjs');
const { getConfig } = require('./getConfig.cjs');
const { rimrafSync } = require('rimraf');
const fs = require('fs');
const { NodeSSH } = require('node-ssh');
const AdmZip = require('adm-zip');

const delZip = ({ zipFilename }) => {
    const record = getRecord('删除压缩包');
    record.start();
    rimrafSync(zipFilename);
    record.end();
};

const delFile = ({ filePath }) => {
    const record = getRecord('删除文件');
    record.start();
    rimrafSync(filePath);
    record.end();
};

const zipFile = ({ filePath, zipFilename }) => {
    const record = getRecord('压缩');
    record.start();
    const zip = new AdmZip();
    zip.addLocalFolder(filePath);
    zip.writeZip(zipFilename);
    record.end();
};

const unzipFile = ({ filePath, zipFilename }) => {
    const record = getRecord('解压缩');
    record.start();
    const zip = new AdmZip(zipFilename);
    zip.extractAllTo(filePath, true); // true = 覆盖现有文件
    record.end();
};

const uploadZip = async ({ username, password, host, zipFilename }) => {
    const record = getRecord('上传压缩包');
    record.start();
    const ssh = new NodeSSH();
    await ssh.connect({ host, username, password });
    await ssh.putFile(`./${zipFilename}`, `/home/web_code/${zipFilename}`);
    ssh.dispose();
    record.end();
};

const downloadZip = async ({ username, password, host, zipFilename }) => {
    const record = getRecord('下载压缩包');
    record.start();
    const ssh = new NodeSSH();
    await ssh.connect({ host, username, password });
    await ssh.getFile(`./${zipFilename}`, `/home/web_code/${zipFilename}`);
    ssh.dispose();
    record.end();
};

const bakZip = ({ zipFilename }) => {
    const record = getRecord('备份源文件');
    record.start();
    fs.rename(`./${zipFilename}`, `./${zipFilename}.bak`, (err) => {
        if (err) throw err;
    });
    record.end();
};

const unbakZip = ({ zipFilename }) => {
    const record = getRecord('还原备份源文件');
    record.start();
    fs.rename(`./${zipFilename}.bak`, `./${zipFilename}`, (err) => {
        if (err) throw err;
    });
    record.end();
};

const clearNodeModules = ({ filePath, deepClear }) => {
    const record = getRecord('清除依赖');
    record.start();
    rimrafSync(`${filePath}/node_modules`);
    execSync('cd', { stdio: 'inherit', cwd: filePath });
    if (deepClear) execSync('npm run rm-dep', { stdio: 'inherit', cwd: filePath });
    record.end();
};

const getArgs1 = () => {
    const args = process.argv.slice(2);
    const args1 = args[0];
    if (args1 === 'upload') return 'upload';
    if (args1 === 'download') return 'download';
    if (args1 === 'unbak') return 'unbak';
    return 'null';
};

(async () => {
    try {
        const { clearDep, deepClear, directory, filename, username, password, host } = getConfig();

        const zipFilename = `${filename}.zip`;

        const filePath = `${directory}${filename}`;

        const args1 = getArgs1();

        switch (args1) {
            case 'upload': {
                if (clearDep) clearNodeModules({ filePath, deepClear });
                zipFile({ filePath, zipFilename });
                await uploadZip({ host, username, password, zipFilename });
                delZip({ zipFilename });
                break;
            }
            case 'download': {
                if (clearDep) clearNodeModules({ filePath, deepClear });
                delZip({ zipFilename });
                zipFile({ filePath, zipFilename });
                bakZip({ zipFilename });
                await downloadZip({ host, username, password, zipFilename });
                delFile({ filePath });
                unzipFile({ filePath, zipFilename });
                delZip({ zipFilename });
                break;
            }
            case 'unbak': {
                unbakZip({ zipFilename });
                unzipFile({ filePath, zipFilename });
                bakZip({ zipFilename });
                break;
            }
            default:
        }
    } catch (e) {
        console.log(colorMap.red(String(e)));
    }
})();
