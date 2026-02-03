/* eslint-disable @typescript-eslint/no-var-requires */
const { HttpsProxyAgent, HttpProxyAgent } = require('hpagent');
const chalk = require('chalk');
const { got } = require('got');

const colorMap = {
    red: chalk.rgb(219, 106, 106),
    blue: chalk.rgb(22, 119, 255),
    green: chalk.rgb(82, 196, 26),
    yellow: chalk.rgb(229, 229, 16),
    purple: chalk.rgb(146, 84, 222),
    magenta: chalk.rgb(235, 47, 150),
    cyan: chalk.rgb(19, 194, 194),
};

const httpsAgent = new HttpsProxyAgent({
    proxy: 'http://localhost:8080',
    rejectUnauthorized: false,
});

const httpAgent = new HttpProxyAgent({
    proxy: 'http://localhost:8080',
});

const isDev = process.env.NODE_ENV === 'development';

const gotInstance = got.extend({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
    },
    agent: {
        https: isDev ? httpsAgent : undefined,
        http: isDev ? httpAgent : undefined,
    },
    methodRewriting: true,
    followRedirect: false,
});

module.exports = { colorMap, gotInstance };
