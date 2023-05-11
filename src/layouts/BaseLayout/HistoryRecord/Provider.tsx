import { LocationContext, LocationTrans } from './Context';
import { useEffect, useMemo, useRef } from 'react';
import type { PropsWithChildren, FC } from 'react';
import { useLocation } from 'react-router-dom';

const HistoryRecordProvider: FC<PropsWithChildren> = ({ children }) => {
    const location = useLocation();

    const beforeLocation = useRef<LocationTrans>({ from: null, to: null });

    useEffect(() => {
        beforeLocation.current.from = beforeLocation.current.to;
        beforeLocation.current.to = location;
    }, [location]);

    const currentLocation: LocationTrans = useMemo(
        () => ({
            from: beforeLocation.current.to,
            to: location,
        }),
        [location],
    );

    return <LocationContext.Provider value={currentLocation}>{children}</LocationContext.Provider>;
};

export default HistoryRecordProvider;
