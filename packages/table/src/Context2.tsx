/* eslint-disable react-refresh/only-export-components */
import { FC, createContext, forwardRef, useContext, useImperativeHandle, ReactElement } from 'react';
import { AnyObj, TableProps, TableRef } from './type';
import useData from './useData';

type Context2Props<T extends AnyObj> = ReturnType<typeof useData<T>>;

type NextComponentType = <T extends AnyObj>(props: TableProps<T> & React.RefAttributes<TableRef>) => ReactElement | null;

const Context2 = createContext<Context2Props<any>>({} as Context2Props<any>);

// Hoc
export const Context2Hoc = (Component: FC) => {
    const NextComponent: NextComponentType = forwardRef((props, ref) => {
        const value = useData(props);

        useImperativeHandle(
            ref,
            () => ({
                headElement: value.headRef,
                bodyElement: value.bodyRef,
                scrollTo: (conf: ScrollToOptions) => value.bodyRef.current?.scrollTo(conf),
            }),
            [],
        );

        return <Context2.Provider value={value}>{<Component />}</Context2.Provider>;
    });

    return NextComponent;
};

// Hook
export const useContext2 = () => {
    return useContext(Context2);
};
