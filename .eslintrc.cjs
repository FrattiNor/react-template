module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    extends: ['eslint:recommended', 'plugin:react-hooks/recommended', 'plugin:@typescript-eslint/recommended'],
    plugins: ['import', 'react-refresh', '@typescript-eslint'],
    rules: {
        // import
        'import/order': [
            'error',
            {
                // 按照分组顺序进行排序
                // builtin 内置模块【path，fs】
                // external 外部模块【react】
                // internal 内部模块【相对路径的模块】
                // parent 父级目录模块
                // sibling 同级目录模块
                // index 当前目录的模块
                // object 使用ES6导入的模块
                // type 导入的Type类型
                // unknown 未知
                groups: ['builtin', 'external', ['internal', 'parent', 'sibling', 'index', 'object'], 'type', 'unknown'],
                // 通过路径自定义分组
                pathGroups: [
                    {
                        pattern: 'react*', // 对含react的包进行匹配
                        group: 'builtin', // 将其定义为builtin模块
                        position: 'before', // 定义在builtin模块中的优先级
                    },
                ],
                //将 react 包不进行排序，并放在前排，可以保证react包放在第一行
                pathGroupsExcludedImportTypes: ['react'],
                // 每个分组之间换行
                'newlines-between': 'always',
                //根据字母顺序对每个组内的顺序进行排序
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        // react-refresh
        'react-refresh/only-export-components': 'warn',
        // custom
        'no-undef': 'off', // 未使用的变量
        '@typescript-eslint/no-explicit-any': 'off', // 不限制使用any
        'react-hooks/exhaustive-deps': 'off', // 不强制 react hook 使用相关依赖
        '@typescript-eslint/ban-ts-comment': 'off', // 不禁用 @ts-ignore
        '@typescript-eslint/consistent-type-imports': 'error', // 必须使用 import type
        'import/no-extraneous-dependencies': 'error', // 幻影依赖
    },
};
