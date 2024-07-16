import { useState, useMemo, useEffect } from 'react';
import { flushSync } from 'react-dom';

import VirtualCore from './VirtualCore';

import type { VirtualCoreOption } from './VirtualCore/type';

type Option = Omit<VirtualCoreOption, 'getContainer'> & {
    container: React.RefObject<HTMLDivElement>;
};

const useVirtualCore = ({ horizontal, container, gap, count, height, endPadding, startPadding }: Option) => {
    const [rangeEnd, setRangeEnd] = useState<number | undefined>(undefined);
    const [rangeStart, setRangeStart] = useState<number | undefined>(undefined);
    const [scrollerSize, setScrollerSize] = useState<number | undefined>(undefined);
    const [scrollerPadding, setScrollerPadding] = useState<number | undefined>(undefined);

    const showIndexs = useMemo(() => {
        const nextShowIndexs: number[] = [];
        if (typeof rangeStart === 'number' && typeof rangeEnd === 'number') {
            for (let index = rangeStart; index <= rangeEnd; index++) {
                nextShowIndexs.push(index);
            }
        }
        return nextShowIndexs;
    }, [rangeStart, rangeEnd]);

    const [instance] = useState(() => {
        return new VirtualCore({
            horizontal,
            getContainer: () => container.current,
        });
    });

    useEffect(() => {
        instance.setOption({
            gap,
            count,
            height,
            endPadding,
            startPadding,
            onChange: () => {
                const changeInfo = instance.getInfo();

                if (changeInfo) {
                    const needSync = changeInfo.startIndex !== rangeStart || changeInfo.endIndex !== rangeEnd;

                    if (needSync || changeInfo.scrollerSize !== scrollerSize || changeInfo.scrollerPadding !== scrollerPadding) {
                        if (needSync) {
                            flushSync(() => {
                                setRangeEnd(changeInfo.endIndex);
                                setRangeStart(changeInfo.startIndex);
                                setScrollerSize(changeInfo.scrollerSize);
                                setScrollerPadding(changeInfo.scrollerPadding);
                            });
                        } else {
                            setRangeEnd(changeInfo.endIndex);
                            setRangeStart(changeInfo.startIndex);
                            setScrollerSize(changeInfo.scrollerSize);
                            setScrollerPadding(changeInfo.scrollerPadding);
                        }
                    }
                }
            },
        });
    });

    useEffect(() => {
        const dispose = instance.init();

        return () => {
            dispose();
        };
    }, []);

    return { scrollerSize, scrollerPadding, showIndexs };
};

export default useVirtualCore;
