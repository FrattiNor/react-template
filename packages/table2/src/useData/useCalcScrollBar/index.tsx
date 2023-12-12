import { BodyResizeObserver } from '../useBodyResizeObserver';
import useCalcScrollBarWidth from './useCalcScrollBarWidth';
import { SortedColumns } from '../useSortColumns';
import { ResizeWidth } from '../useResizeWidth';
import { VirtualCore } from '../useVirtual';

type Opt<T> = {
    defaultWidth: number;
    virtual: VirtualCore;
    resizeWidth: ResizeWidth;
    sortedColumns: SortedColumns<T>;
    bodyResizeObserver: BodyResizeObserver;
};

const useCalcScrollBar = <T,>(opt: Opt<T>) => {
    const { vScrollBarWidth, hScrollBarWidth, calcScrollBarDom } = useCalcScrollBarWidth();

    const { bodyResizeObserver, virtual, resizeWidth, sortedColumns, defaultWidth } = opt;

    const bodyWidth = bodyResizeObserver.size.width || 0;
    const bodyHeight = bodyResizeObserver.size.height || 0;
    const bodyInnerHeight = virtual.verticalTotalSize;
    const bodyInnerWidth1 = virtual.horizontalTotalSize;
    const bodyInnerWidth2 = sortedColumns.columns.reduce((a, b) => a + (b.width ?? defaultWidth), 0);
    const bodyInnerWidth = resizeWidth.resized ? bodyInnerWidth1 : bodyInnerWidth2;

    const _vScrollBarWidth = bodyInnerHeight > bodyHeight ? vScrollBarWidth : 0;
    const _hScrollBarWidth = bodyInnerWidth > bodyWidth ? hScrollBarWidth : 0;

    return { vScrollBarWidth: _vScrollBarWidth, hScrollBarWidth: _hScrollBarWidth, calcScrollBarDom };
};

export type CalcScrollBar = ReturnType<typeof useCalcScrollBar>;
export default useCalcScrollBar;
