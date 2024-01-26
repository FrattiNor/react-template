export type Local = 'zh_ch' | 'en_us';

export type TranslationProps = {
    local?: Local;
    t1Maps?: Record<string, Record<string, string>>;
    t2Maps?: Record<string, Record<string, string>>;
};
