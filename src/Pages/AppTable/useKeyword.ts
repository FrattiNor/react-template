import { useMemo, useState } from 'react';

const useKeyword = () => {
	const [keyword, setKeyword] = useState('');

	const globalHighlightKeywords = useMemo(() => {
		return [keyword];
	}, [keyword]);

	return { globalHighlightKeywords, keyword, setKeyword };
};

export default useKeyword;
