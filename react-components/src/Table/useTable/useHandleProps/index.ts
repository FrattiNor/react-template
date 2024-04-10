import type { TableProps } from '../../type';
import { defaultAutoScrollTop, defaultLineHeight } from '../index';

const useHandleProps = <T>(props: TableProps<T>) => {
    const handledProps = {
        ...props,
        rowHeight: typeof props.rowHeight === 'number' ? Math.round(props.rowHeight) : defaultLineHeight,
        autoScrollTop: typeof props.autoScrollTop === 'boolean' ? props.autoScrollTop : defaultAutoScrollTop,
        rowSelection: props.rowSelection === true ? {} : props.rowSelection,
        expandable: props.expandable === true ? {} : props.expandable,
        pagination: props.pagination === true ? {} : props.pagination,
    };

    return handledProps;
};

export type HandledProps<T> = ReturnType<typeof useHandleProps<T>>;
export default useHandleProps;
