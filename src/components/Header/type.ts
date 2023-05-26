import { Route } from '@/routes/routes';
import { Dispatch, PropsWithChildren, SetStateAction } from 'react';

export type Props = PropsWithChildren;

export type MenuProps = {
    routes: Array<Route>;
    menuVisible: boolean;
    setMenuVisible: Dispatch<SetStateAction<boolean>>;
};
