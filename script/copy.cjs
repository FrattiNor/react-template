/* eslint-disable @typescript-eslint/no-var-requires */
// 无法使用path,会显示非法字符,相对位置为root目录
const copyfiles = require('copyfiles');

copyfiles(['./public/node-v18.15.0-win-x64', './dist'], { up: 1 }, () => {});
copyfiles(['./public/run.bat', './dist'], { up: 1 }, () => {});
