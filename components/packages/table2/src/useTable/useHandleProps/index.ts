import { defaultLineHeight } from '../index';
import { TableProps } from '../../type';

const useHandleProps = <T>(props: TableProps<T>) => {
    const handledProps = {
        ...props,
        rowHeight: typeof props.rowHeight === 'number' ? Math.round(props.rowHeight) : defaultLineHeight,
    };

    return handledProps;
};

export type HandledProps<T> = ReturnType<typeof useHandleProps<T>>;
export default useHandleProps;
