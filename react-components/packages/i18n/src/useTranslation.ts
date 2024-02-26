import { useContext } from 'react';

import Context from './Context';
import packageT1Map from './package.t1Map.json';
import packageT2Map from './package.t2Map.json';
import { TranslationMap } from './type';

const defaultT1 = (v: string) => {
    console.log(v, (packageT1Map as TranslationMap)?.[v], (packageT1Map as TranslationMap)?.[v]?.['zh_cn']);
    return (packageT1Map as TranslationMap)?.[v]?.['zh_cn'] ?? v;
};

const defaultT2 = (v: string, opt: Record<string, string>) => {
    let res = (packageT2Map as TranslationMap)?.[v]?.['zh_cn'] ?? v;
    Object.entries(opt).forEach(([key, value]) => {
        res = res.replaceAll(`{{${key}}}`, defaultT1(value));
    });
    return v;
};

const useTranslation = () => {
    const contextValue = useContext(Context);
    const { local, setLocal, t1, t2 } = contextValue;

    return {
        local: local ?? 'zh_cn',
        setLocal: setLocal ?? ((v) => v),
        t1: t1 ?? defaultT1,
        t2: t2 ?? defaultT2,
    };
};

export default useTranslation;
