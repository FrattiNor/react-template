import BScroll from '@better-scroll/core';
import InfinityScroll from '@better-scroll/infinity';
import { useEffect } from 'react';
import styles from './index.module.less';

BScroll.use(InfinityScroll);

const InfinityDOM = () => {
    useEffect(() => {
        const bs = new BScroll('#wrapper', {
            infinity: {
                render: (item, _div) => {
                    console.log('render', item, _div);
                    const div = document.createElement('div') || _div;
                    div.innerText = '1';
                    return div;
                },
                createTombstone: () => {
                    console.log('createTombstone');
                    return document.createElement('div');
                },
                fetch: (_count) => {
                    console.log('fetch', _count);
                    const count = Math.max(30, _count);
                    return new Promise((resolve) => {
                        if (count > 500) return resolve(false);
                        const items = Array(count)
                            .fill('')
                            .map((_, i) => i);
                        setTimeout(() => {
                            resolve(Promise.all(items));
                        }, 500);
                    });
                },
            },
        });
        // bs.on('scroll', () => {
        //     console.log('is scrolling');
        // });
        // bs.on('scrollEnd', () => {
        //     console.log('scrollEnd');
        // });
        // return () => {
        //     bs.destroy();
        // };
    }, []);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['handle']}>
                <button>顶部</button>
                <button>中间</button>
                <button>底部</button>
            </div>

            <div className={styles['scroll-wrapper']} id="wrapper">
                <div className={styles['container']} style={{ height: 10000 }}></div>
            </div>
        </div>
    );
};

export default InfinityDOM;
