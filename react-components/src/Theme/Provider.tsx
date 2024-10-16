import { type FC, type PropsWithChildren } from 'react';

import classNames from 'classnames';

import Context from './Context';
import styles from './styles/theme.module.less';
import { type ThemeProps } from './type';
import useProvider from './useProvider';

const Provider: FC<PropsWithChildren<ThemeProps>> = ({ children, ...props }) => {
	const value = useProvider(props);
	const { container } = props;
	const { containerRef, theme } = value;
	const containerProps = container === true ? {} : container;
	const { withBg, className, minHeight, minWidth, withScrollBar } = containerProps;

	return (
		<Context.Provider value={value}>
			<div
				ref={containerRef}
				className={classNames(className, styles[theme], styles['apply-theme'], styles['theme-container'], {
					[styles['with-bg']]: withBg,
					[styles['with-scroll-bar']]: withScrollBar,
				})}
			>
				<div className={styles['theme-container-inner']} style={{ minHeight, minWidth }}>
					{children}
				</div>
			</div>
		</Context.Provider>
	);
};

export default Provider;
