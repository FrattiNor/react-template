// eslint配置 https://cn.eslint.org/docs/rules/
module.exports = {
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module'
    },
    env: {
        node: true,
        browser: true,
        commonjs: true,
        es6: true
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react-hooks'],
    globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
        // React: false,
        // ReactDOM: false
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect'
        }
    },
    rules: {
        // 这里填入你的项目需要的个性化配置
        '@typescript-eslint/no-var-requires': 'off', // var 和 require（webpack需要使用）
        '@typescript-eslint/member-delimiter-style': 'off', // interface，分号分隔
        'no-duplicate-imports': 'error', // 禁止重复导入
        semi: ['error', 'never'], //禁止分号
        'no-console': 'warn', // 禁用 console
        'no-unused-vars': [
            // 禁止出现未使用过的变量
            'error',
            {
                vars: 'all',
                args: 'after-used',
                caughtErrors: 'none'
            }
        ],
        'max-nested-callbacks': 'off', // 强制回调函数最大嵌套深度
        'react/no-children-prop': 'off',
        'typescript/member-ordering': 'off',
        'typescript/member-delimiter-style': 'off',
        'react/jsx-indent-props': 'off',
        'react/no-did-update-set-state': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        // 'react/prop-types': [2, { ignore: ['children'] }],
        'react/prop-types': 'off',
        indent: [
            // 缩进4个空格
            'error',
            4,
            {
                SwitchCase: 1,
                flatTernaryExpressions: true
            }
        ]
    }
}
