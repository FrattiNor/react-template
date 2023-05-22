import { LocationContext, LocationTrans } from './Context';
import { useContext } from 'react';

const useHistoryRecord = (): LocationTrans => {
    return useContext(LocationContext);
};

export default useHistoryRecord;
