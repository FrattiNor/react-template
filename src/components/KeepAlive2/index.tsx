import { FC, useContext, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import Context2 from './context2';
import ReactDOM from 'react-dom';
import { Props } from './type';

const KeepAlive2: FC<Props> = ({ children, cacheKey, wrapperClassName, contentClassName, wrapperStyle, contentStyle }) => {
    const { cacheMap, setCacheMap, setNeedCacheMap } = useContext(Context2);
    const parent = useRef<HTMLDivElement>(null);
    const memoKey = useMemo(() => cacheKey, []);
    const element = cacheMap[cacheKey]?.element;

    useLayoutEffect(() => {
        setCacheMap((map) => {
            const _element = map[memoKey]?.element || document.createElement('div');
            map[memoKey] = { element: _element, portal: ReactDOM.createPortal(children, _element) };
            return { ...map };
        });
    }, [children]);

    useEffect(() => {
        if (element && parent.current) {
            if (contentClassName) element.setAttribute('class', contentClassName);
            if (contentStyle) element.setAttribute('style', contentStyle);
            parent.current.appendChild(element);
            return () => {
                parent.current?.removeChild(element);
            };
        }
    }, [element]);

    useEffect(() => {
        return () => {
            setNeedCacheMap((need) => {
                if (need[memoKey]) {
                    delete need[memoKey];
                    return { ...need };
                } else {
                    setCacheMap((map) => {
                        if (map[memoKey]) delete map[memoKey];
                        return { ...map };
                    });
                    delete need[memoKey];
                    return { ...need };
                }
            });
        };
    }, []);

    return <div ref={parent} className={wrapperClassName} style={wrapperStyle} />;
};

export default KeepAlive2;
