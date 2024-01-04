import { useContext } from 'react';
import Context from './Context';

const useTranslation = () => {
    const contextValue = useContext(Context);
    const { local, setLocal, t1, t2 } = contextValue;

    const defaultT2 = (v: string, opt: Record<string, string>) => {
        let res = v;
        Object.entries(opt).forEach(([key, value]) => {
            res = res.replaceAll(`{{${key}}}`, value);
        });
        return v;
    };

    return {
        local: local ?? 'zh_ch',
        setLocal: setLocal ?? ((v) => v),
        t1: t1 ?? ((v) => v),
        t2: t2 ?? defaultT2,
    };
};

export default useTranslation;
