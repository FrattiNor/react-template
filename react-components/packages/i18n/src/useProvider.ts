import { useState } from 'react';

import { TranslationProps, Local } from './type';

const useProvider = ({ local: _local = 'zh_ch', t1Map, t2Map }: TranslationProps) => {
    const [local, setLocal] = useState<Local>(_local);

    const t1 = (v: string) => {
        return t1Map?.[v]?.[local] ?? v;
    };

    const t2 = (v: string, opt: Record<string, string>) => {
        let res = t2Map?.[v]?.[local] ?? v;
        Object.entries(opt).forEach(([key, value]) => {
            res = res.replaceAll(`{{${key}}}`, t1(value));
        });
        return v;
    };

    return { local, setLocal, t1, t2 };
};

export default useProvider;
