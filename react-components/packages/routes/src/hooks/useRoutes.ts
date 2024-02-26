import { useContext } from 'react';

import Context from '../Routes/Context';

const useRoutes = () => {
    return useContext(Context);
};

export default useRoutes;
