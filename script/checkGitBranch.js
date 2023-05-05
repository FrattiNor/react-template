const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

// ================ 监听 ctrl+c 退出（需要报错退出，不然package.json中会执行&&之后的命令） ================
if (process.platform === 'win32') {
    readline.on('SIGINT', () => {
        process.exit(1001);
    });
} else {
    process.on('SIGINT', () => {
        process.exit(1001);
    });
}
// ================ 监听 ctrl+c 退出 ================

const checkYes = (currentVersion) => {
    return new Promise((res) => {
        readline.question('请检查当前版本是否正确(y/n): ', (v) => {
            if (v === 'y' || v === '') {
                // 写入 webpack/conf/branch.js
                fs.writeFileSync(path.join(__dirname, '../webpack/conf/branch.js'), `const branch = "${currentVersion}"; module.exports = { branch };`, 'utf-8');
                readline.close();
                res();
            } else if (v === 'n') {
                process.exit(1001);
            } else {
                console.log('输入不正确');
                res(checkYes(currentVersion));
            }
        });
    });
};

exec('git branch', (err, stdout, stderr) => {
    if (!err) {
        console.log('Git 版本信息: ');
        console.log(stdout);
        const currentVersion = /\* (.*)($|\n)/.exec(stdout)?.[1] || '';
        checkYes(currentVersion);
    }
});
