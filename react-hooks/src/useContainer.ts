import { useRef } from 'react';

type Props = {
    getContainer?: () => HTMLElement | undefined;
};

const useContainer = ({ getContainer }: Props) => {
    const containerRef = useRef<HTMLElement | null>(null);

    const _getContainer = () => {
        if (containerRef.current === null) containerRef.current = getContainer ? getContainer() ?? document.body : document.body;
        return containerRef.current;
    };

    const clearContainer = () => {
        containerRef.current = null;
    };

    return { getContainer: _getContainer, clearContainer };
};

export default useContainer;
