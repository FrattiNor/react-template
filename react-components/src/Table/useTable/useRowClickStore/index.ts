import { useState } from 'react';

const useRowClickStore = () => {
	const [clickedRow, setClickedRow] = useState<string | null>(null);

	return { clickedRow, setClickedRow };
};

export default useRowClickStore;
