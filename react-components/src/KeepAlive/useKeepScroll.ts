import { useRef } from 'react';

import useActivate from './useActivate';
import useUnActivate from './useUnActivate';

const useKeepScroll = (getScroll: () => HTMLDivElement | undefined | null) => {
    // === keep-alive 保留滚动信息 === //
    const scrollPositionRef = useRef({ top: 0, left: 0 });

    useActivate(() => {
        setTimeout(() => {
            const scroll = getScroll();
            const { top, left } = scrollPositionRef.current;
            if (scroll) scroll.scrollTo({ top, left });
        });
    });

    useUnActivate(() => {
        const scroll = getScroll();
        if (scroll) {
            const top = scroll.scrollTop;
            const left = scroll.scrollLeft;
            scrollPositionRef.current = { top, left };
        }
    });
    // === keep-alive 保留滚动信息 === //
};

export default useKeepScroll;
