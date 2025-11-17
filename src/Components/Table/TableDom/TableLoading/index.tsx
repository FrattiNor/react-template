import { type FC, type HtmlHTMLAttributes, type PropsWithChildren, createElement, Fragment } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import Loading, { type LoadingProps } from './Loading';

type Props = PropsWithChildren<
	HtmlHTMLAttributes<HTMLDivElement> &
		LoadingProps & {
			component?: 'div' | 'span';
			wrapperRef?: React.RefObject<HTMLDivElement | null>;
		}
>;

const TableLoading: FC<Props> = (props) => {
	const { wrapperRef, loading, loadingMaxHeight, component = 'div', children, ...divProps } = props;

	return createElement(component, {
		...divProps,
		ref: wrapperRef,
		className: classNames(styles['loading-div'], divProps.className, { [styles['loading']]: loading === true }),
		children: (
			<Fragment>
				{children}
				{loading === true && <Loading loading={loading} loadingMaxHeight={loadingMaxHeight} />}
			</Fragment>
		),
	});
};

export default TableLoading;
