import { TranslationProps, Local } from './type';
import { useState } from 'react';

const useProvider = ({ local: _local = 'zh_ch', t1Maps, t2Maps }: TranslationProps) => {
    const [local, setLocal] = useState<Local>(_local);

    const t1Map = t1Maps?.[local];

    const t2Map = t2Maps?.[local];

    const t1 = (v: string) => {
        return t1Map?.[v] ?? v;
    };

    const t2 = (v: string, opt: Record<string, string>) => {
        let res = t2Map?.[v] ?? v;
        Object.entries(opt).forEach(([key, value]) => {
            res = res.replaceAll(`{{${key}}}`, t1(value));
        });
        return v;
    };

    return { local, setLocal, t1, t2 };
};

export default useProvider;
