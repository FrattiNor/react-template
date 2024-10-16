import { useContext } from 'react';

import Context from './Context';

const useCurrentModal = () => {
	return useContext(Context);
};

export default useCurrentModal;
