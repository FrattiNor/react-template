/* eslint-disable @typescript-eslint/no-unused-vars */
import Filter from '@/components/InfiniteList/Filter';
import { Swiper, SwiperRef, Tabs } from 'antd-mobile';
import InfiniteList from '../InfiniteList';
import styles from './index.module.less';
import { useRef, useState } from 'react';
import { Props } from './type';

function InfiniteLists<T>({ items }: Props<T>) {
    const [view, setView] = useState('0');
    const swiperRef = useRef<SwiperRef>(null);
    const filterProps = items[Number(view)].filter;
    const filterList = filterProps?.filterList;
    const query = items[Number(view)].query;

    const tabChange = (v: string) => {
        setView(v);
        swiperRef.current?.swipeTo(Number(v));
    };

    return (
        <div className={styles['wrapper']}>
            <div className={styles['tab']}>
                <Tabs activeKey={view} onChange={tabChange}>
                    {items.map(({ title }, index) => (
                        <Tabs.Tab title={title} key={`${index}`} />
                    ))}
                </Tabs>
            </div>

            <div className={styles['list']}>
                <Swiper
                    ref={swiperRef}
                    indicator={() => null}
                    style={{ height: '100%' }}
                    defaultIndex={Number(view)}
                    onIndexChange={(index) => setView(`${index}`)}
                >
                    {items.map(({ filter, ...rest }, index) => (
                        <Swiper.Item key={`${index}`}>
                            <InfiniteList {...rest} />
                        </Swiper.Item>
                    ))}
                </Swiper>

                {filterList && <Filter {...filterProps} filterList={filterList} params={query.params} addAndDelParams={query.addAndDelParams} />}
            </div>
        </div>
    );
}

export default InfiniteLists;
