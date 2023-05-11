import { Virtualizer } from '@tanstack/react-virtual';
import { useEffect, useState } from 'react';
import BScroll from '@better-scroll/core';

function useVirtualizer(scroll: BScroll) {
    const [virtualizer, setVirtualizer] = useState<Virtualizer<HTMLDivElement, any> | null>(null);

    return { virtualizer };
}

export default useVirtualizer;
