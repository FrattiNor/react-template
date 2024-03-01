import { useEffect } from 'react';

type Props = {
    type: 'esc' | 'enter';
    callback: () => void;
    enabled?: boolean;
};

const useKeyDown = (props: Props) => {
    const { type, callback, enabled } = props;
    useEffect(() => {
        if (enabled) {
            const keyDown = (e: KeyboardEvent) => {
                if (type === 'esc' && (e.keyCode === 27 || e.key === 'Escape' || e.code === 'Escape')) {
                    callback();
                }
                if (type === 'enter' && (e.keyCode === 13 || e.key === 'Enter' || e.code === 'Enter')) {
                    callback();
                }
            };

            document.addEventListener('keydown', keyDown);

            return () => {
                document.removeEventListener('keydown', keyDown);
            };
        }
    }, [enabled]);
};

export default useKeyDown;
