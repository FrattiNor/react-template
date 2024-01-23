/* eslint-disable react-refresh/only-export-components */
import { FC, createContext, forwardRef, useContext, useImperativeHandle, ReactNode } from 'react';
import { AnyObj, VirtualListProps, VirtualListRef } from './type';
import useList from './useList';

type VirtualListContextProps<T extends AnyObj> = ReturnType<typeof useList<T>>;

type NextComponentType = <T extends AnyObj>(props: VirtualListProps<T> & React.RefAttributes<VirtualListRef>) => ReactNode | null;

const VirtualListContext = createContext<VirtualListContextProps<any>>({} as VirtualListContextProps<any>);

// Hoc
export const VirtualListContextHoc = (Component: FC) => {
    const NextComponent: NextComponentType = forwardRef((props, ref) => {
        const value = useList(props);

        useImperativeHandle(ref, () => ({
            getInstance: () => value as any,
        }));

        return <VirtualListContext.Provider value={value}>{<Component />}</VirtualListContext.Provider>;
    });

    return NextComponent;
};

// Hook
export const useVirtualListContext = () => {
    return useContext(VirtualListContext);
};
