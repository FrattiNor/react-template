import useCalcScrollBarWidth from './useCalcScrollBarWidth';
import { Virtual } from '../useVirtualColumns/useVirtual';
import { BodyObserver } from '../useBodyObserver';

type Opt = {
    bodyObserver: BodyObserver;
    virtual: Virtual;
};

const useCalcScrollBar = (opt: Opt) => {
    const { vScrollBarWidth, hScrollBarWidth, calcScrollBarDom } = useCalcScrollBarWidth();

    const { bodyObserver, virtual } = opt;

    const bodyWidth = bodyObserver.bodyResizeObserver.size.width || 0;
    const bodyHeight = bodyObserver.bodyResizeObserver.size.height || 0;
    const bodyInnerWidth = virtual.horizontalTotalSize;
    const bodyInnerHeight = virtual.verticalTotalSize;

    const _vScrollBarWidth = bodyInnerWidth > bodyWidth ? vScrollBarWidth : 0;
    const _hScrollBarWidth = bodyInnerHeight > bodyHeight ? hScrollBarWidth : 0;

    return { vScrollBarWidth: _vScrollBarWidth, hScrollBarWidth: _hScrollBarWidth, calcScrollBarDom };
};

export default useCalcScrollBar;
