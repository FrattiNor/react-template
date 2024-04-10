import { useState } from 'react';

import packageT1Map from './Map/package.t1Map.json';
import packageT2Map from './Map/package.t2Map.json';
import type { TranslationProps, Local, TranslationMap } from './type';

const useProvider = ({ defaultLocal = 'zh_cn', t1Map, t2Map }: TranslationProps) => {
    const [local, setLocal] = useState<Local>(defaultLocal);

    const t1 = (v: string) => {
        return (packageT1Map as TranslationMap)?.[v]?.[local] ?? t1Map?.[v]?.[local] ?? v;
    };

    const t2 = (v: string, opt: Record<string, string>) => {
        let res = (packageT2Map as TranslationMap)?.[v]?.[local] ?? t2Map?.[v]?.[local] ?? v;
        Object.entries(opt).forEach(([key, value]) => {
            res = res.replaceAll(`{{${key}}}`, t1(value));
        });
        return res;
    };

    return { local, setLocal, t1, t2 };
};

export default useProvider;
