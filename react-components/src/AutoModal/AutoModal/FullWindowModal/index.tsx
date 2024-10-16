import { type FC } from 'react';

import { Modal, type ModalProps } from 'antd';

type Props = Omit<ModalProps, 'modalRender'>;

const FullWindowModal: FC<Props> = (props) => {
	return (
		<Modal
			{...props}
			width="100vw"
			style={{ maxWidth: '100vw', margin: 0, ...props.style }}
			wrapProps={{ style: { overflow: 'hidden', ...props.wrapProps?.style }, ...props.wrapProps }}
			styles={{
				header: props.styles?.header,
				footer: props.styles?.footer,
				body: { height: 0, flexGrow: 1, maxHeight: 'unset', ...props?.styles?.body },
				content: { padding: 0, borderRadius: 0, height: '100vh', display: 'flex', flexDirection: 'column', ...props.styles?.content },
			}}
		/>
	);
};

export default FullWindowModal;
