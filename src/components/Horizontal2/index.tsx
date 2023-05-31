import { FC, PropsWithChildren, useLayoutEffect } from 'react';

const Horizontal2: FC<PropsWithChildren> = ({ children }) => {
    useLayoutEffect(() => {
        document.body.setAttribute('class', 'v-h');

        return () => {
            document.body.setAttribute('class', '');
        };
    }, []);

    return <>{children}</>;
};

export default Horizontal2;
