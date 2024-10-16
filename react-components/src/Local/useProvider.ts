import { useState } from 'react';

import packageT1Map from './Map/package.t1Map.json';
import packageT2Map from './Map/package.t2Map.json';
import { type TranslationProps, type Local, type TranslationMap } from './type';

const useProvider = ({ defaultLocal = 'zh_cn', t1Map, t2Map, coverT1, coverT2 }: TranslationProps) => {
	const [local, setLocal] = useState<Local>(defaultLocal);

	const t1 = (key: string) => {
		if (typeof coverT1 === 'function') return coverT1({ packageT1Map, t1Map, key, local });
		return (packageT1Map as TranslationMap)?.[key]?.[local] ?? t1Map?.[key]?.[local] ?? key;
	};

	const t2 = (key: string, replaceObj: Record<string, string>) => {
		if (typeof coverT2 === 'function') return coverT2({ packageT2Map, t2Map, key, replaceObj, local });
		let res = (packageT2Map as TranslationMap)?.[key]?.[local] ?? t2Map?.[key]?.[local] ?? key;
		Object.entries(replaceObj).forEach(([key, value]) => {
			res = res.replace(new RegExp(`{{${key}}}`, 'g'), t1(value));
		});
		return res;
	};

	return { local, setLocal, t1, t2 };
};

export default useProvider;
