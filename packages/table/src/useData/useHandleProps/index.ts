import { TableProps } from '../../type';

const useHandleProps = <T>(props: TableProps<T>) => {
    const { columns, ...restProps } = props;
    const { rowKey, dataSource, autoScrollTop } = restProps;
    const isEmpty = (props.dataSource || [])?.length === 0;
    const newProps = { ...restProps, isEmpty };
    return { columns, rowKey, dataSource, autoScrollTop, newProps };
};

export type HandledProps<T> = ReturnType<typeof useHandleProps<T>>;
export default useHandleProps;
