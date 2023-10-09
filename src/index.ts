import { countTime } from './time2.js';
import { loginEhr } from './login.js';
import { Command } from 'commander';
import inquirer from 'inquirer';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 命令行参数
const program = new Command();
program.name('统计加班小工具').version('0.1.0').option('-t, --test', 'test commander').parse(process.argv);

// 命令行问答
const prompt = inquirer.createPromptModule();
const questions = [
    {
        type: 'input',
        name: 'username',
        message: '用户名:',
    },
    {
        type: 'password',
        name: 'password',
        message: '密码:',
    },
    {
        type: 'input',
        name: 'year',
        message: '查询年份（默认当年）:',
    },
    {
        type: 'input',
        name: 'month',
        message: '查询月份（默认当月）:',
    },
];

(async () => {
    try {
        // 开始问答
        const answers = await prompt(questions);
        const { username, password, year: _year, month: _month } = answers;

        if (username === '') {
            console.log('请输入用户名');
            return;
        }

        const year = _year === '' ? undefined : Number(_year);
        const month = _month === '' ? undefined : Number(_month);

        if (year !== undefined && isNaN(year)) {
            console.log('请输入正确年份:', _year);
        }

        if (month !== undefined && isNaN(month)) {
            console.log('请输入正确月份:', _month);
        }

        // 开始查询
        const { REDSESSIONID, staff_id } = await loginEhr({ username, password });
        if (REDSESSIONID !== undefined && staff_id !== undefined) {
            countTime({ REDSESSIONID, staff_id }, { month, year });
        } else {
            console.log('登录失败');
        }
    } catch (e) {
        console.log('error', e);
    }
})();
