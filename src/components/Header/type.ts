import { Dispatch, PropsWithChildren, SetStateAction } from 'react';

export type Props = PropsWithChildren;

export type MenuProps = {
    menuVisible: boolean;
    setMenuVisible: Dispatch<SetStateAction<boolean>>;
};
