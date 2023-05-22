import type { Location } from 'react-router-dom';
import { createContext } from 'react';

export type LocationTrans = {
    from: Location | null;
    to: Location | null;
};

export const LocationContext = createContext<LocationTrans>({ from: null, to: null });
