import { RefObject, useEffect } from 'react';
import { TableProps } from '../../type';

const fixedNumMap = {
    left: -1,
    default: 0,
    right: 1,
};

type Opt = {
    defaultLineHeight: number;
    defaultAutoScrollTop: boolean;
    bodyRef: RefObject<HTMLDivElement | null>;
};

const useHandleProps = <T>(props: TableProps<T>, opt: Opt) => {
    const { defaultAutoScrollTop, defaultLineHeight, bodyRef } = opt;

    const { rowHeight, autoScrollTop, columns } = props;

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

    // 根据fixed排序后的columns
    const sortedColumns = columns.sort((a, b) => fixedNumMap[a.fixed ?? 'default'] - fixedNumMap[b.fixed ?? 'default']);

    return {
        outerProps,
        innerProps: { isEmpty, sortedColumns },
    };
};

export type HandledProps<T> = ReturnType<typeof useHandleProps<T>>;
export default useHandleProps;
