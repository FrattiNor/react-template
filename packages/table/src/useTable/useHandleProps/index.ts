import { TableProps } from '../../type';

type Opt = {
    defaultLineHeight: number;
    defaultAutoScrollTop: boolean;
};

const useHandleProps = <T>(props: TableProps<T>, opt: Opt) => {
    const { defaultAutoScrollTop, defaultLineHeight } = opt;

    const { rowHeight, autoScrollTop } = props;

    const isEmpty = (props.dataSource || [])?.length === 0;

    const handledProps = {
        ...props,
        rowHeight: typeof rowHeight === 'number' ? Math.round(rowHeight) : defaultLineHeight,
        autoScrollTop: typeof autoScrollTop === 'boolean' ? autoScrollTop : defaultAutoScrollTop,
    };

    return { handledProps, isEmpty };
};

export type HandledProps<T> = ReturnType<typeof useHandleProps<T>>['handledProps'];
export default useHandleProps;
