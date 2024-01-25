import { useEffect } from 'react';
import Stats from 'stats.js';

const useFps = () => {
    useEffect(() => {
        const isDev = process.env.NODE_ENV === 'development';

        if (isDev) {
            const stats = new Stats();
            stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
            stats.dom.style.left = '0px';
            document.body.appendChild(stats.dom);

            const animate = () => {
                stats.begin();
                stats.end();
                requestAnimationFrame(animate);
            };

            requestAnimationFrame(animate);

            return () => {
                document.body.removeChild(stats.dom);
            };
        }
    }, []);
};

export default useFps;
