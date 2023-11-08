import * as readline from 'readline';
import convert from './convert.js';
import inquirer from 'inquirer';
import process from 'process';
import chalk from 'chalk';

// 命令行问答
const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: 'input',
        name: 'oldAppId',
        message: '旧AppId:',
    },
    {
        type: 'input',
        name: 'newAppId',
        message: '新AppId:',
    },
];

(async () => {
    try {
        // 开始问答
        const answers = await prompt(questions);
        const { oldAppId, newAppId } = answers;
        await convert(oldAppId, newAppId);
    } catch (e) {
        console.log(chalk.red('error'));
        console.log(e);
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
