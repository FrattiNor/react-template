import { type ModalProps } from 'antd';
import classNames from 'classnames';

import styles from './index.module.less';

const useBodyScrollProps = (props: ModalProps, bodyScroll: 'none' | 'normal' | 'stable' = 'stable') => {
	const bodyClassName = (() => {
		switch (bodyScroll) {
			case 'none':
				return classNames(styles['no-body-scroll'], props.classNames?.body);
			case 'normal':
				return classNames(styles['normal-body-scroll'], props.classNames?.body);
			case 'stable':
				return classNames(styles['stable-body-scroll'], props.classNames?.body);
			default:
				return classNames(styles['no-body-scroll'], props.classNames?.body);
		}
	})();

	const modalProps: ModalProps = {
		...props,
		className: classNames(styles['body-scroll-wrapper'], props.className),
		classNames: {
			body: bodyClassName,
			header: props.classNames?.header,
			footer: props.classNames?.footer,
			content: classNames(styles['body-scroll-content'], props.classNames?.content),
		},
	};

	return modalProps;
};

export default useBodyScrollProps;
