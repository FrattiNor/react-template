import { RefObject, useEffect } from 'react';
import { TableProps } from '../../type';

type Opt = {
    defaultLineHeight: number;
    defaultAutoScrollTop: boolean;
    bodyRef: RefObject<HTMLDivElement | null>;
};

const useHandleProps = <T>(props: TableProps<T>, opt: Opt) => {
    const { defaultAutoScrollTop, defaultLineHeight, bodyRef } = opt;

    const { rowHeight, autoScrollTop } = props;

    const isEmpty = (props.dataSource || [])?.length === 0;

    const handledProps = {
        ...props,
        rowHeight: typeof rowHeight === 'number' ? Math.round(rowHeight) : defaultLineHeight,
        autoScrollTop: typeof autoScrollTop === 'boolean' ? autoScrollTop : defaultAutoScrollTop,
    };

    // 数据变更时触发滚动回顶部
    useEffect(() => {
        if (handledProps.autoScrollTop === true) {
            bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [handledProps.dataSource]);

    return { handledProps, isEmpty };
};

export type HandledProps<T> = ReturnType<typeof useHandleProps<T>>['handledProps'];
export default useHandleProps;
