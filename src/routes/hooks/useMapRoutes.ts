import { CustomRouteItem } from '../type';
import { useMemo } from 'react';
import routes from '../routes';

export type MapRouteItem = {
    path: string;
    title: string;
};

// 删除双斜杠和结尾斜杠
const deleteEndSlashAndDoubleSlash = (path: string) => {
    let res = path;
    while (res.includes('//')) {
        res = res.replaceAll('//', '/');
    }
    if (res !== '/' && /\/$/.test(res)) {
        res = res.replace(/\/$/, '');
    }
    return res;
};

// 拼接path
const joinPath = (beforePath: string, path: string) => {
    const currentPath = /\?/.test(path) ? path.replaceAll('?', '') : path;
    return deleteEndSlashAndDoubleSlash(beforePath + currentPath);
};

// 根据 Array<CustomRouteItem> 获取 MapRoutes
const getMapRoutes = (rs: Array<CustomRouteItem>, beforePath = '/') => {
    let map: Record<string, MapRouteItem> = {};
    rs.forEach((item) => {
        const currentPath = joinPath(beforePath, item.path);

        if (item.children) {
            map = { ...map, ...getMapRoutes(item.children, currentPath) };
        } else {
            if (item.title) {
                map[currentPath] = { title: item.title, path: currentPath };
            }
        }
    });
    return map;
};

const useMapRoutes = () => {
    return useMemo(() => getMapRoutes(routes), []);
};

export default useMapRoutes;
