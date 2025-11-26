import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPluginImport from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
	globalIgnores(['dist', 'src_old']),
	reactHooks.configs.flat['recommended-latest'],
	{
		files: ['**/*.{ts,tsx}'],
		extends: [js.configs.recommended, tseslint.configs.recommended, reactRefresh.configs.vite],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
	},
	{
		plugins: {
			import: eslintPluginImport,
		},
		rules: {
			'react-hooks/exhaustive-deps': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'import/order': [
				'error',
				{
					groups: ['builtin', 'external', 'unknown', ['internal', 'parent', 'sibling', 'index', 'object'], 'type'],
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
]);
