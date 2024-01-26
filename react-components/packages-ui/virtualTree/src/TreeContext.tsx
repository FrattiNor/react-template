/* eslint-disable react-refresh/only-export-components */
import { FC, createContext, forwardRef, useContext, useImperativeHandle, ReactNode } from 'react';
import { AnyObj, VirtualTreeProps, VirtualTreeRef } from './type';
import useTree from './useTree';

type VirtualTreeContextProps<T extends AnyObj> = ReturnType<typeof useTree<T>>;

type NextComponentType = <T extends AnyObj>(props: VirtualTreeProps<T> & React.RefAttributes<VirtualTreeRef>) => ReactNode | null;

const VirtualTreeContext = createContext<VirtualTreeContextProps<any>>({} as VirtualTreeContextProps<any>);

// Hoc
export const VirtualTreeContextHoc = (Component: FC) => {
    const NextComponent: NextComponentType = forwardRef((props, ref) => {
        const value = useTree(props);

        useImperativeHandle(ref, () => ({
            getInstance: () => value as any,
        }));

        return <VirtualTreeContext.Provider value={value}>{<Component />}</VirtualTreeContext.Provider>;
    });

    return NextComponent;
};

// Hook
export const useVirtualTreeContext = () => {
    return useContext(VirtualTreeContext);
};
