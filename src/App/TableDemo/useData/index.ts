import { useState } from 'react';

import getData from './data';

const useData = () => {
	const [data, setData] = useState(() => getData(20));
	const changeData = () => setData((old) => getData(old.length === 20 ? 5 : 20));
	return { data, changeData };
};

export default useData;
