import { TableProps, TableTheme } from '../../type';

type Opt = {
    defaultTheme: TableTheme;
    defaultLineHeight: number;
    defaultAutoScrollTop: boolean;
};

const useHandleProps = <T>(props: TableProps<T>, opt: Opt) => {
    const { defaultAutoScrollTop, defaultLineHeight, defaultTheme } = opt;

    const isEmpty = (props.dataSource || [])?.length === 0;

    const handledProps = {
        ...props,
        theme: props.theme ?? defaultTheme,
        rowHeight: typeof props.rowHeight === 'number' ? Math.round(props.rowHeight) : defaultLineHeight,
        autoScrollTop: typeof props.autoScrollTop === 'boolean' ? props.autoScrollTop : defaultAutoScrollTop,
    };

    return { handledProps, isEmpty };
};

export type HandledProps<T> = ReturnType<typeof useHandleProps<T>>['handledProps'];
export default useHandleProps;
