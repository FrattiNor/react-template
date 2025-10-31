import { useState } from 'react';

import getData from './data';

const useData = () => {
	const [data] = useState(() => getData(20));
	return { data };
};

export default useData;
