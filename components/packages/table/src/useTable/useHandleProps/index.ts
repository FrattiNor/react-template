import { defaultAutoScrollTop, defaultLineHeight } from '../index';
import { TableProps } from '../../type';

const useHandleProps = <T>(props: TableProps<T>) => {
    const isEmpty = (props.dataSource || [])?.length === 0;

    const handledProps = {
        ...props,
        rowHeight: typeof props.rowHeight === 'number' ? Math.round(props.rowHeight) : defaultLineHeight,
        autoScrollTop: typeof props.autoScrollTop === 'boolean' ? props.autoScrollTop : defaultAutoScrollTop,
    };

    return { handledProps, isEmpty };
};

export type HandledProps<T> = ReturnType<typeof useHandleProps<T>>['handledProps'];
export default useHandleProps;
