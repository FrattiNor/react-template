import EmptyComponent from './emptyComponent';
import DocumentTitle from './documentTitle';
import { getComponent } from './utils';
import ErrorCatch from './errorCatch';
import type { FC } from 'react';

type Props = {
    component?: any;
    title: string;
};

const RenderComponent: FC<Props> = ({ component, title }) => {
    const Component = getComponent(component);

    return (
        <ErrorCatch>
            <DocumentTitle title={title}>{Component ? <Component /> : <EmptyComponent />}</DocumentTitle>
        </ErrorCatch>
    );
};

export default RenderComponent;
