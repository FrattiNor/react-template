import { type CSSProperties } from 'react';

import { type ModalProps } from 'antd';

const useBodyStyleProps = (props: ModalProps, bodyStyle?: CSSProperties) => {
	const modalProps: ModalProps = {
		...props,

		styles: {
			header: props.styles?.header,
			footer: props.styles?.footer,
			content: props.styles?.content,
			body: { ...props.styles?.body, ...bodyStyle },
		},
	};

	return modalProps;
};

export default useBodyStyleProps;
