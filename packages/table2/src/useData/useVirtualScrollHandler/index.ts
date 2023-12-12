import { RefObject } from 'react';

type Opt = {
    bodyRef: RefObject<HTMLDivElement | null>;
    headRef: RefObject<HTMLDivElement | null>;
};

const useVirtualScrollHandler = (opt: Opt) => {
    const { bodyRef, headRef } = opt;

    const onVScroll = (e: Event) => {
        const target = e.target as HTMLDivElement;
        if (bodyRef.current) bodyRef.current.scrollTo({ top: target.scrollTop });
    };

    const onHScroll = (e: Event) => {
        const target = e.target as HTMLDivElement;
        if (bodyRef.current) bodyRef.current.scrollTo({ left: target.scrollLeft });
        if (headRef.current) headRef.current.scrollTo({ left: target.scrollLeft });
    };

    return { onVScroll, onHScroll };
};

export default useVirtualScrollHandler;
