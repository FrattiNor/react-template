import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { HistoryRecordProvider } from './HistoryRecord';
import RenderComponent from './RenderComponent';
import type { RouteItem } from './menu';
import { Fragment } from 'react';
import type { FC } from 'react';
import menu from './menu';

const RenderRoute: FC = () => {
    const renderRoute = (list: RouteItem[]) => {
        return (
            <Fragment>
                {list.map((item) => {
                    const { path, component, routes, use = true, redirect, title } = item;

                    if (redirect) {
                        return <Route key={path + redirect} path={path} element={<Navigate to={redirect} replace />} />;
                    }

                    if (use) {
                        return (
                            <Route key={path} path={path} element={<RenderComponent component={component} title={title || ''} />}>
                                {Array.isArray(routes) && routes.length > 0 && renderRoute(routes)}
                            </Route>
                        );
                    }

                    return null;
                })}
            </Fragment>
        );
    };

    return <Routes>{renderRoute(menu)}</Routes>;
};

const RouteWrapper: FC = () => {
    return (
        <BrowserRouter>
            <HistoryRecordProvider>
                <RenderRoute />
            </HistoryRecordProvider>
        </BrowserRouter>
    );
};

export default RouteWrapper;
