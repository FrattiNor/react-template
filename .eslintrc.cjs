module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    extends: ['eslint:recommended', 'plugin:react-hooks/recommended', 'plugin:@typescript-eslint/recommended'],
    plugins: ['import', 'react-refresh', '@typescript-eslint'],
    rules: {
        // react-refresh
        'react-refresh/only-export-components': 'warn',
        // import
        'import/order': [
            'error',
            {
                // 按照分组顺序进行排序
                groups: ['builtin', 'external', ['internal', 'parent', 'sibling', 'index', 'object', 'type'], 'unknown'],
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
        // custom
        'no-undef': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'react-hooks/exhaustive-deps': 'off',
    },
};
