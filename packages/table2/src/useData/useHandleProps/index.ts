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

    const outerProps = {
        ...props,
        rowHeight: typeof rowHeight === 'number' ? Math.round(rowHeight) : defaultLineHeight,
        autoScrollTop: typeof autoScrollTop === 'boolean' ? autoScrollTop : defaultAutoScrollTop,
    };

    // 数据变更时触发滚动回顶部
    useEffect(() => {
        if (outerProps.autoScrollTop === true) {
            bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [outerProps.dataSource]);

    return {
        outerProps,
        innerProps: { isEmpty },
    };
};

export type HandledProps<T> = ReturnType<typeof useHandleProps<T>>;
export default useHandleProps;
