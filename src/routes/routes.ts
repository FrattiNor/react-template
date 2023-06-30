
import { CustomRouteItem } from './type';

const routes: Array<CustomRouteItem> = [
    {
        title: 'TEST',
        path: 'TEST?',
        LazyComponent: () => import('@/pages/__TEST__'),
    },
];

export default routes;
