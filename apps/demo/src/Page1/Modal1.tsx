import { FC, useEffect } from 'react';

import { AutoModal } from '@react/components';

console.log('modal1');

const Modal1: FC<{ a: number }> = ({ a }) => {
    useEffect(() => {
        console.log(1);
    }, []);

    return (
        <AutoModal width={800}>
            <div style={{ height: 300, wordBreak: 'break-all' }}>
                {a}
                asdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdas
            </div>
        </AutoModal>
    );
};

export default Modal1;
