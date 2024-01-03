import { forwardRef } from 'react';
import Provider from './Provider';
import { Theme } from './type';

// Hoc
const Hoc = <T,>(Component: T, opt?: { theme: Theme }) => {
    const NextComponent = forwardRef((_props, ref) => {
        const { theme } = opt || {};
        const _Component = Component as any;
        return <Provider theme={theme}>{<_Component {..._props} ref={ref} />}</Provider>;
    });

    return NextComponent as T;
};

export default Hoc;
