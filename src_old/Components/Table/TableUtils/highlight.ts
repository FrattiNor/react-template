import { findAll } from 'highlight-words-core';

import type { TableHighlightConfig } from '../TableTypes/type';

type Chunks = Array<{
	end: number;
	start: number;
	highlight: boolean;
}>;

// 获取高亮chunks
const getHighlightChunks = (config?: TableHighlightConfig) => (keywords: string[]) => (text: string) => {
	const { trim = false, autoEscape = false, caseSensitive = false } = config ?? {};

	// 搜索关键字
	const _keywords = (() => {
		const _keywords: string[] = [];
		keywords.forEach((keyword) => {
			if (typeof keyword === 'string' && keyword !== '') {
				if (trim === true) {
					_keywords.push(keyword.trim());
				} else {
					_keywords.push(keyword);
				}
			}
		});
		return _keywords;
	})();

	// 搜索文本
	const _text = (() => {
		let _text = '';
		if (typeof text === 'string') {
			if (trim === true) {
				_text = text.trim();
			} else {
				_text = text;
			}
		}
		return _text;
	})();

	return findAll({
		autoEscape, // 自动转义
		caseSensitive, // 大小写敏感
		searchWords: _keywords, // 关键字
		textToHighlight: _text, // 文本
	}) as Chunks;
};

export { getHighlightChunks };
