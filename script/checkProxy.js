const { getProxyAddress, getProxyName, getMqttDevAddress, getMqttDevName } = require('../webpack/conf/utils');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

// ================ 监听 ctrl+c 退出（需要报错退出，不然package.json中会执行&&之后的命令）================
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

const checkYes = () => {
    return new Promise((res) => {
        console.log(`当前代理地址为: ${getProxyAddress()} [${getProxyName()}]`);
        console.log(`当前mqtt地址为: ${getMqttDevAddress()} [${getMqttDevName()}]`);
        readline.question('是否正确(y/n): ', (v) => {
            if (v === 'y' || v === '') {
                readline.close();
                res();
            } else if (v === 'n') {
                process.exit(1001);
            } else {
                console.log('输入不正确');
                res(checkYes());
            }
        });
    });
};

checkYes();
