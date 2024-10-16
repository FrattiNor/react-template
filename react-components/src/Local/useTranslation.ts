import { useContext } from 'react';

import Context from './Context';
import packageT1Map from './Map/package.t1Map.json';
import packageT2Map from './Map/package.t2Map.json';
import { type TranslationMap } from './type';

const defaultT1 = (key: string) => {
	return (packageT1Map as TranslationMap)?.[key]?.['zh_cn'] ?? key;
};

const defaultT2 = (key: string, replaceObj: Record<string, string>) => {
	let res = (packageT2Map as TranslationMap)?.[key]?.['zh_cn'] ?? key;
	Object.entries(replaceObj).forEach(([key, value]) => {
		res = res.replace(new RegExp(`{{${key}}}`, 'g'), defaultT1(value));
	});
	return res;
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
