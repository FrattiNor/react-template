import { type FC, type HtmlHTMLAttributes, type PropsWithChildren, createElement, Fragment } from 'react';

import classNames from 'classnames';

import Dot from './Dot';
import styles from './index.module.less';

type Props = PropsWithChildren<
	HtmlHTMLAttributes<HTMLDivElement> & {
		loading?: boolean;
		component?: 'div' | 'span';
		wrapperRef?: React.RefObject<HTMLDivElement | null | undefined>;
	}
>;

const LoadingDiv: FC<Props> = (props) => {
	const { component = 'div', wrapperRef, loading, children, className, ...divProps } = props;

	return createElement(component, {
		...divProps,
		ref: wrapperRef,
		className: classNames(styles['loading-div'], className, { [styles['loading']]: loading === true }),
		children: (
			<Fragment>
				{children}
				{loading === true && (
					<div className={styles['loading-wrapper']}>
						<div className={styles['dot-position']}>
							<Dot />
						</div>
					</div>
				)}
			</Fragment>
		),
	});
};

export default LoadingDiv;
