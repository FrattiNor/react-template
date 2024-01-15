import useBodyResizeObserver from './useBodyResizeObserver';
import useBodyScrollObserver from './useBodyScrollObserver';
import useCalcScrollBarWidth from './useCalcScrollBarWidth';
import useSortConfColumns from './useSortConfColumns';
import useHandleColumns from './useHandleColumns';
import useResizeWidth from './useResizeWidth';
import useHandleProps from './useHandleProps';
import { AnyObj, TableProps } from '../type';
import useCalcPing from './useCalcPing';
import useVirtual from './useVirtual';
import { useRef } from 'react';

export const defaultWidth = 150;
export const defaultFlexGrow = 1;
export const defaultLineHeight = 36;
export const defaultAutoScrollTop = false;

const useTable = <T extends AnyObj>(props: TableProps<T>) => {
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);

    // 给了默认值的props
    const handledProps = useHandleProps(props);

    // 空
    const isEmpty = (handledProps.dataSource || [])?.length === 0;

    //  整合后排序的 columns
    const { sortedColumns } = useSortConfColumns({
        columns: handledProps.columns,
    });

    //  title resize
    const resizeWidth = useResizeWidth({ handledProps });

    // ping
    const { calcPing, ping } = useCalcPing({ bodyRef });

    // v scrollbar
    const { calcScrollBarWidth, vScrollBarWidth } = useCalcScrollBarWidth({ bodyRef });

    //  body resize observer
    const bodyResizeObserver = useBodyResizeObserver({
        bodyRef,
        calcPing,
        calcScrollBarWidth,
    });

    // body scroll observer
    const bodyScrollObserver = useBodyScrollObserver({
        bodyRef,
        headRef,
        calcPing,
    });

    // virtual table core
    const virtual = useVirtual({
        bodyRef,
        handledProps,
        sortedColumns,
        bodyScrollObserver,
        bodyResizeObserver,
        dataSource: handledProps.dataSource || [],
    });

    // handle columns
    const handledColumns = useHandleColumns({
        virtual,
        resizeWidth,
        sortedColumns,
    });

    return {
        ping,
        bodyRef,
        headRef,
        isEmpty,
        vScrollBarWidth,
        ...virtual,
        ...resizeWidth,
        ...handledColumns,
        props: handledProps,
    };
};

export default useTable;
