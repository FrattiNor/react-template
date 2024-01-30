import { FC, useContext, useLayoutEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';

import { WrapperContext } from './Context';
import { Props } from './type';

// 目前缺陷
// Context在KeepAliveProvider2里面时，缓存时无法获取到
const KeepAlive2: FC<Props> = (props) => {
    const {
        children,
        cacheKey: _cacheKey,
        wrapperClassName,
        contentClassName,
        wrapperStyle = { height: '100%' },
        contentStyle = 'height: 100%',
    } = props;

    const cacheKey = useMemo(() => _cacheKey, []);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { cacheMap, setCacheMap, needCacheMapRef, unActivateRef, activateRef } = useContext(WrapperContext);
    const activate = useMemo(() => !!cacheMap[cacheKey], []); // 判断触发useActivate
    const element = cacheMap[cacheKey]?.element;

    // add cacheMap
    useLayoutEffect(() => {
        setCacheMap((map) => {
            const _element = map[cacheKey]?.element || document.createElement('div');
            map[cacheKey] = { element: _element, portal: ReactDOM.createPortal(children, _element) };
            return { ...map };
        });
    }, [children]);

    useLayoutEffect(() => {
        if (element && wrapperRef.current) {
            // appendChild
            if (contentClassName) element.setAttribute('class', contentClassName);
            if (contentStyle) element.setAttribute('style', contentStyle);
            wrapperRef.current.appendChild(element);
            // activate
            if (activate && activateRef.current[cacheKey]) {
                activateRef.current[cacheKey].forEach((cb) => cb());
            }

            // unMount
            return () => {
                if (needCacheMapRef.current[cacheKey]) {
                    // once
                    delete needCacheMapRef.current[cacheKey];
                    // unActivate
                    if (unActivateRef.current[cacheKey]) {
                        unActivateRef.current[cacheKey].forEach((cb) => cb());
                    }
                } else {
                    // clear
                    delete unActivateRef.current[cacheKey];
                    delete activateRef.current[cacheKey];
                    setCacheMap((map) => {
                        if (map[cacheKey]) delete map[cacheKey];
                        return { ...map };
                    });
                }

                wrapperRef.current?.removeChild(element);
            };
        }
    }, [element]);

    return <div ref={wrapperRef} className={wrapperClassName} style={wrapperStyle} />;
};

export default KeepAlive2;
