/* eslint-disable @typescript-eslint/no-unused-vars */
import Filter from '@/components/InfiniteList/Filter';
import { Swiper, SwiperRef, Tabs } from 'antd-mobile';
import InfiniteList from '../InfiniteList';
import styles from './index.module.less';
import { useRef, useState } from 'react';
import Float from '../InfiniteList/Float';
import { Props } from './type';

function InfiniteLists({ items }: Props<any>) {
    const [view, setView] = useState('0');
    const swiperRef = useRef<SwiperRef>(null);
    const filterProps = items[Number(view)]?.filter;
    const floatProps = items[Number(view)]?.float;
    const filterList = filterProps?.filterList;
    const RenderFloat = floatProps?.render;
    const query = items[Number(view)]?.query;
    const params = query?.params;
    const addAndDelParams = query?.addAndDelParams;

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
                    {items.map(({ filter, float, ...rest }, index) => (
                        <Swiper.Item key={`${index}`}>
                            <InfiniteList {...rest} />
                        </Swiper.Item>
                    ))}
                </Swiper>

                {RenderFloat && (
                    <Float {...floatProps}>
                        <RenderFloat {...query} />
                    </Float>
                )}

                {filterList && <Filter {...filterProps} filterList={filterList} params={params} addAndDelParams={addAndDelParams} />}
            </div>
        </div>
    );
}

export default InfiniteLists;
