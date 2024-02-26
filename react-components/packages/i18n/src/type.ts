export type Local = 'zh_ch' | 'en_us';

export type TranslationProps = {
    local?: Local;
    t1Map?: Record<string, Partial<Record<Local, string>>>;
    t2Map?: Record<string, Partial<Record<Local, string>>>;
};
