import { forwardRef } from 'react';

import Provider from './Provider';
import { TranslationProps } from './type';

// Hoc
const Hoc = <T,>(Component: T, props?: TranslationProps) => {
    const NextComponent = forwardRef((_props, ref) => {
        const { local, t1Maps, t2Maps } = props || {};
        const _Component = Component as any;
        return (
            <Provider local={local} t1Maps={t1Maps} t2Maps={t2Maps}>
                {<_Component {..._props} ref={ref} />}
            </Provider>
        );
    });

    return NextComponent as T;
};

export default Hoc;
