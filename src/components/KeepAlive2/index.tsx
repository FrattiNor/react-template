import { FC, useContext, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import Context2 from './context2';
import { Props } from './type';

const KeepAlive2: FC<Props> = ({ children, cacheKey, wrapperClassName, contentClassName, wrapperStyle, contentStyle }) => {
    const { cacheMap, setCacheMap, setNeedCacheMap } = useContext(Context2);
    const havePush = useRef(false);
    const ref = useRef<HTMLDivElement>(null);
    const memoKey = useMemo(() => `${cacheKey}`, []);
    const element = cacheMap[cacheKey]?.element || null;

    useEffect(() => {
        if (!havePush.current && element && ref.current) {
            if (contentClassName) element.setAttribute('class', contentClassName);
            if (contentStyle) element.setAttribute('style', contentStyle);
            ref.current.appendChild(element);
            // 避免多次插入dom
            havePush.current = true;
        }
    }, [element]);

    useLayoutEffect(() => {
        setCacheMap((map) => {
            if (!map[memoKey]) {
                const _element = document.createElement('div');
                const _portal = ReactDOM.createPortal(children, _element);
                map[memoKey] = { element: _element, portal: _portal };
            } else {
                const _portal = ReactDOM.createPortal(children, map[memoKey].element);
                map[memoKey] = { element: map[memoKey].element, portal: _portal };
            }
            return { ...map };
        });
    }, [children]);

    useEffect(() => {
        return () => {
            setNeedCacheMap((need) => {
                if (need[memoKey]) {
                    delete need[memoKey];
                    return { ...need };
                } else {
                    setCacheMap((map) => {
                        if (map[memoKey]) {
                            delete map[memoKey];
                        }
                        return { ...map };
                    });
                    delete need[memoKey];
                    return { ...need };
                }
            });
        };
    }, []);

    return <div ref={ref} className={wrapperClassName} style={wrapperStyle}></div>;
};

export default KeepAlive2;
