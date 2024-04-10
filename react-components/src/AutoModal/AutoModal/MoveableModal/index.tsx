import type { FC } from 'react';

import { Modal } from 'antd';

import styles from './index.module.less';
import useMoveModal from './useMoveModal';
import type { ModalProps } from 'antd';

type Props = Omit<ModalProps, 'modalRender'>;

const MoveableModal: FC<Props> = (props) => {
    const { moveRef, onMouseDown, position } = useMoveModal();

    return (
        <Modal
            {...props}
            style={{ ...position, ...props.style }}
            modalRender={(modal) => (
                <div className={styles['custom-wrapper']} ref={moveRef}>
                    <div className={styles['draggable']} onMouseDown={onMouseDown} />
                    {modal}
                </div>
            )}
        />
    );
};

export default MoveableModal;
