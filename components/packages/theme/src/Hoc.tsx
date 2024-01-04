import { forwardRef } from 'react';
import Provider from './Provider';
import { Props } from './type';

// Hoc
const Hoc = <T,>(Component: T, props?: Props) => {
    const NextComponent = forwardRef((_props, ref) => {
        const { theme } = props || {};
        const _Component = Component as any;
        return <Provider theme={theme}>{<_Component {..._props} ref={ref} />}</Provider>;
    });

    return NextComponent as T;
};

export default Hoc;
