/* eslint-disable @typescript-eslint/no-var-requires */
const chalk = require('chalk');

const colorMap = {
    red: chalk.rgb(219, 106, 106),
    blue: chalk.rgb(22, 119, 255),
    green: chalk.rgb(82, 196, 26),
    yellow: chalk.rgb(229, 229, 16),
    purple: chalk.rgb(146, 84, 222),
    magenta: chalk.rgb(235, 47, 150),
    cyan: chalk.rgb(19, 194, 194),
};

const getRecord = (handle) => {
    let timestamp = 0;

    const start = () => {
        timestamp = new Date().valueOf();
        console.log(colorMap.blue(`${handle}中...`));
    };
    const end = () => {
        console.log(colorMap.green(`${handle}完成`));
        console.log(colorMap.yellow(`耗时: ${(new Date().valueOf() - timestamp) / 1000}s\n`));
    };

    return { start, end };
};

module.exports = { colorMap, getRecord };
