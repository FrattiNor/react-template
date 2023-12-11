import { TableProps } from '../../type';

const useProps = <T extends Record<string, any>>(props: TableProps<T>) => {
    const { columns, ...restProps } = props;
    const { dataSource, autoScrollTop } = restProps;
    const isEmpty = (props.dataSource || [])?.length === 0;
    const newProps = { ...restProps, isEmpty };
    return { columns, dataSource, autoScrollTop, newProps };
};

export default useProps;
