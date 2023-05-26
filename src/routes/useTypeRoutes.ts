import { useLayoutEffect, useState } from 'react';
import routes, { Route } from './routes';

const getTypeRoutes = (r: Array<Route>) => {
    const homeRoutes: Array<Route> = [];
    const secondRoutes: Array<Route> = [];
    const detailRoutes: Array<Route> = [];
    const errorRoutes: Array<Route> = [];

    const handlePath = (beforePath: string, path: string) => {
        const endSlash = /\/$/.test(beforePath);
        if (path === '/' || path === '') return beforePath + (endSlash ? '' : '/');
        if (/\?/.test(path)) return beforePath + (endSlash ? '' : '/');
        if (!endSlash && !/^\//.test(path)) return beforePath + '/' + path;
        return beforePath + path;
    };

    const getMapRoutes = (rs: Array<Route>, beforePath = '', beforeType = '') => {
        let map: Record<string, Route> = {};
        rs.forEach((item) => {
            const currentPath = handlePath(beforePath, item.path);
            const currentType = item.type ?? beforeType;
            if (item.children) {
                map = { ...map, ...getMapRoutes(item.children, currentPath, currentType) };
            } else {
                const pushItem = { ...item, path: currentPath, type: currentType, Component: undefined };
                map[currentPath] = pushItem;

                switch (currentType) {
                    case 'home':
                        homeRoutes.push(pushItem);
                        break;
                    case 'second':
                        secondRoutes.push(pushItem);
                        break;
                    case 'detail':
                        detailRoutes.push(pushItem);
                        break;
                    case 'error':
                        errorRoutes.push(pushItem);
                        break;
                    default:
                        break;
                }
            }
        });
        return map;
    };

    const mapRoutes = getMapRoutes(r);

    return { homeRoutes, secondRoutes, detailRoutes, errorRoutes, mapRoutes };
};

const useTypeRoutes = () => {
    const [res, setRes] = useState<ReturnType<typeof getTypeRoutes>>({
        homeRoutes: [],
        secondRoutes: [],
        detailRoutes: [],
        errorRoutes: [],
        mapRoutes: {},
    });

    useLayoutEffect(() => {
        setRes(getTypeRoutes(routes));
    }, []);

    return res;
};

export default useTypeRoutes;
