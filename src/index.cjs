/* eslint-disable @typescript-eslint/no-var-requires */
const inquirer = require('inquirer');
const { colorMap } = require('./utils.cjs');
const { getConfig } = require('./getConfig.cjs');
const { addPage } = require('./addPage.cjs');

// 命令行问答
const prompt = inquirer.createPromptModule();
const questions = [
    {
        type: 'input',
        name: 'type',
        message: '参数type:',
    },
    {
        type: 'input',
        name: 'name',
        message: '参数name:',
    },
];

(async () => {
    try {
        console.log(colorMap.cyan('Supos组态模板生成助手\n'));

        // 验证配置
        getConfig();

        // 开始问答，获取参数
        const answers = await prompt(questions);
        const { name, type } = answers;
        // 验证参数
        if (name === '') {
            console.log(colorMap.red('请输入参数name'));
            return;
        }
        if (type === '') {
            console.log(colorMap.red('请输入参数type'));
            return;
        }
        // 添加页面
        await addPage({ name, type });
    } catch (e) {
        console.log(colorMap.red(String(e)));
    }
})();
