import { Fragment, type FC } from 'react';

import { Modal, type ModalProps } from 'antd';

import styles from './index.module.less';
import useMoveModal from './useMoveModal';

type Props = Omit<ModalProps, 'modalRender'>;

const MoveableModal: FC<Props> = (props) => {
	const { moveRef, onMouseDown, position } = useMoveModal();

	const title = props.title ? (
		<Fragment>
			{props.title}
			<div className={styles['draggable']} onMouseDown={onMouseDown} />
		</Fragment>
	) : (
		props.title
	);

	return (
		<Modal
			{...props}
			title={title}
			style={{ ...props.style, ...position }}
			modalRender={(modal) => (
				<div className={styles['custom-wrapper']} ref={moveRef}>
					{modal}
				</div>
			)}
		/>
	);
};

export default MoveableModal;
