import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginImport from 'eslint-plugin-import';

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			import: eslintPluginImport,
			'react-hooks': eslintPluginReactHooks,
			'react-refresh': eslintPluginReactRefresh,
		},
		rules: {
			...eslintPluginReactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': 'error',
			'react-hooks/exhaustive-deps': 'off', //  不强制 react hook 使用相关依赖
			'@typescript-eslint/no-explicit-any': 'off', // 不限制使用any
			'import/no-extraneous-dependencies': 'error', // 禁止幻影依赖
			'import/no-duplicates': ['error', { 'prefer-inline': true }], // 禁止从同一个模块中多次导入
			'@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }], // 必须使用 import type
			// import
			'import/order': [
				'error',
				{
					// 按照分组顺序进行排序
					// builtin 内置模块【path，fs】
					// external 外部模块【nanoid】
					// internal 内部模块【相对路径的模块】
					// parent 父级目录模块
					// sibling 同级目录模块
					// index 当前目录的模块
					// object 使用ES6导入的模块
					// type 导入的Type类型
					// unknown 未知【alias被识别为unknown】
					groups: ['builtin', 'external', 'unknown', ['internal', 'parent', 'sibling', 'index', 'object'], 'type'],
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
		},
	},
);
