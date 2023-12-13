import { TableProps } from '../../type';

const useHandleProps = <T>(props: TableProps<T>) => {
    const { columns, ...restProps } = props;
    const isEmpty = (props.dataSource || [])?.length === 0;
    const { autoScrollTop = true, rowHeight = 32 } = props;
    const newProps = { ...restProps, autoScrollTop, rowHeight, isEmpty };
    return { columns, newProps };
};

export type HandledProps<T> = ReturnType<typeof useHandleProps<T>>;
export default useHandleProps;
