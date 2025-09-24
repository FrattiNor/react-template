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
		className: classNames(className, styles['loading-div']),
		children: (
			<Fragment>
				{children}
				{loading === true && (
					<Fragment>
						<div className={styles['loading-mask']} />
						<div className={styles['loading-wrapper']}>
							<div className={styles['dot-position']}>
								<Dot />
							</div>
						</div>
					</Fragment>
				)}
			</Fragment>
		),
	});
};

export default LoadingDiv;
