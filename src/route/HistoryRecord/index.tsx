import { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import type { PropsWithChildren, FC } from 'react';
import type { Location } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

type LocationTrans = {
    from: Location | null;
    to: Location | null;
};

const LocationContext = createContext<LocationTrans>({ from: null, to: null });

export const HistoryRecordProvider: FC<PropsWithChildren> = ({ children }) => {
    const location = useLocation();

    const beforeLocation = useRef<LocationTrans>({ from: null, to: null });

    const currentLocation: LocationTrans = useMemo(
        () => ({
            from: beforeLocation.current.to,
            to: location,
        }),
        [location],
    );

    useEffect(() => {
        beforeLocation.current.from = beforeLocation.current.to;
        beforeLocation.current.to = location;
    }, [location]);

    return <LocationContext.Provider value={currentLocation}>{children}</LocationContext.Provider>;
};

export function useHistoryRecord(): LocationTrans {
    return useContext(LocationContext);
}
