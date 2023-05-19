import VirtualizerList from '@/components/VirtualizerList2';
import { useCallback, useState } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import { ListProps } from './type';

function List<T>({ query, renderItem, rowKey, enableVisible }: ListProps<T>) {
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

    return (
        <VirtualizerList
            data={data}
            enableScroll
            rowKey={rowKey}
            loading={isLoading}
            enablePullDown={{ refetch }}
            enableLoadMore={{ hasNextPage: !!hasNextPage, isFetchingNextPage, fetchNextPage }}
            renderItem={(item, { key, index }) => (
                <div className={classNames(styles['item'], { [styles['first']]: index === 0 })} onClick={() => itemClick(key)}>
                    {renderItem(item, { key, index, visible: !!visibles[key] })}
                </div>
            )}
        />
    );
}

export default List;
