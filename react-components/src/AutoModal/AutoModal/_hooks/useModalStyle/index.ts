import { type ModalProps } from 'antd';

const useModalStyle = (props: ModalProps) => {
	const modalProps: ModalProps = {
		...props,

		styles: {
			body: props.styles?.body,
			content: { padding: 0, ...props.styles?.content },
			footer: { padding: '12px 24px 20px 24px', margin: 0, ...props.styles?.footer },
			header: { padding: '16px 24px 16px 24px', margin: 0, position: 'relative', ...props.styles?.header },
		},
	};

	return modalProps;
};

export default useModalStyle;
