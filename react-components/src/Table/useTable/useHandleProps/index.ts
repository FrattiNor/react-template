import { defaultLineHeight } from '../index';

import type { TableColumns, TableProps } from '../../type';

const useHandleProps = <T>(props: TableProps<T>) => {
    const handledProps = {
        ...props,
        columns: props.columns as TableColumns<T>, // 断言将TableColumnsOut转换为TableColumns
        rowHeight: typeof props.rowHeight === 'number' ? Math.round(props.rowHeight) : defaultLineHeight,
        rowSelection: props.rowSelection === true ? {} : props.rowSelection,
        expandable: props.expandable === true ? {} : props.expandable,
        pagination: props.pagination === true ? {} : props.pagination,
    };

    return handledProps;
};

export type HandledProps<T> = ReturnType<typeof useHandleProps<T>>;
export default useHandleProps;
