export type Local = 'zh_cn' | 'en_us';

export type TranslationMap = Record<string, Partial<Record<Local, string>>>;

export type TranslationProps = {
    defaultLocal?: Local;
    t1Map?: TranslationMap;
    t2Map?: TranslationMap;
};
