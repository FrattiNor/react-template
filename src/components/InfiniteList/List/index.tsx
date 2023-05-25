import VirtualizerList from '@/components/VirtualizerList';
import { useCallback, useEffect, useState } from 'react';
import styles from './index.module.less';
import { ListProps } from './type';
import classNames from 'classnames';

function List<T>({ query, renderItem, rowKey, enableVisible, itemPadding = true }: ListProps<T>) {
    const { data, isLoading, fetchNextPage, refetch, hasNextPage, isFetchingNextPage } = query;
    const [visibles, setVisibles] = useState<Record<string, boolean>>({});

    const itemClick = useCallback(
        (key: string) => {
            if (enableVisible) {
                setVisibles((vs) => ({ ...vs, [key]: !vs[key] }));
            }
        },
        [enableVisible],
    );

    // isLoading在react-query中代表第一次请求
    useEffect(() => {
        if (isLoading) setVisibles({});
    }, [isLoading]);

    return (
        <VirtualizerList
            data={data}
            enableScroll
            rowKey={rowKey}
            borderWidth={3}
            loading={isLoading}
            enablePullDown={{ refetch }}
            enableLoadMore={{ hasNextPage: !!hasNextPage, isFetchingNextPage, fetchNextPage }}
            renderItem={(item, { key, index }) => (
                <div className={classNames(styles['item'], { [styles['padding']]: itemPadding })} onClick={() => itemClick(key)}>
                    {renderItem(item, { key, index, visible: !!visibles[key] })}
                </div>
            )}
        />
    );
}

export default List;
