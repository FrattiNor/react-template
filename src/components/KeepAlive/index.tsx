import { FC, Fragment, useContext, useEffect, useMemo } from 'react';
import Context from './context';
import { Props } from './type';

const KeepAlive: FC<Props> = ({ children, id }) => {
    // 缓存
    const { cacheMap, setCacheMap, setNeedCacheMap } = useContext(Context);
    // id不允许变更
    const memoId = useMemo(() => id, []);
    // children不允许变更, 有缓存优先使用缓存
    const child = useMemo(() => cacheMap[memoId] || children, []);

    useEffect(() => {
        return () => {
            // 离开时判断缓存信号
            setNeedCacheMap((needMap) => {
                if (needMap[memoId]) {
                    // 如果需要缓存
                    // 将child存入cacheMap
                    setCacheMap((map) => ({ ...map, [memoId]: child }));
                    // 删除缓存信号
                    const nextMap = { ...needMap };
                    delete nextMap[memoId];
                    return nextMap;
                } else {
                    // 如果不需要缓存
                    // 删除cacheMap里对应的id不管有没有
                    setCacheMap((map) => {
                        const nextMap = { ...map };
                        delete nextMap[memoId];
                        return nextMap;
                    });
                    return needMap;
                }
            });
        };
    }, []);

    return <Fragment>{child}</Fragment>;
};

export default KeepAlive;
