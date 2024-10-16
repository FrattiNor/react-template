import { type FC, type HtmlHTMLAttributes, type PropsWithChildren, createElement, Fragment } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import Loading, { type LoadingProps } from './Loading';

type Props = PropsWithChildren<
	HtmlHTMLAttributes<HTMLDivElement> &
		LoadingProps & {
			component?: 'div' | 'span';
		}
>;

const LoadingDiv: FC<Props> = (props) => {
	const { loading, loadingType, loadingMaxHeight, component = 'div', children, ...divProps } = props;

	return createElement(component, {
		...divProps,
		className: classNames(styles['loading-div'], divProps.className, { [styles['loading']]: loading === true }),
		children: (
			<Fragment>
				{children}
				{loading === true && <Loading loading={loading} loadingType={loadingType} loadingMaxHeight={loadingMaxHeight} />}
			</Fragment>
		),
	});
};

export default LoadingDiv;
