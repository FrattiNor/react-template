import Iconfont from '@/components/Iconfont';
import { FC } from 'react';

type Props = {
    clear: () => void;
};

const Clear: FC<Props> = ({ clear }) => {
    return (
        <Iconfont
            icon="clear"
            style={{ color: 'var(--adm-color-light)', padding: '0.3rem 0' }}
            onClick={(e) => {
                e.stopPropagation();
                clear();
            }}
        />
    );
};

export default Clear;
