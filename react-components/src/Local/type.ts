export type Local = 'zh_cn' | 'en_us';

export type TranslationMap = Record<string, Partial<Record<Local, string>>>;

export type TranslationProps = {
	defaultLocal?: Local;
	t1Map?: TranslationMap;
	t2Map?: TranslationMap;
	// 覆盖原始t1函数
	coverT1?: (props: { packageT1Map: TranslationMap | undefined; t1Map: TranslationMap | undefined; key: string; local: Local }) => string;
	// 覆盖原始t2函数
	coverT2?: (props: {
		packageT2Map: TranslationMap | undefined;
		t2Map: TranslationMap | undefined;
		replaceObj: Record<string, string>;
		key: string;
		local: Local;
	}) => string;
};
