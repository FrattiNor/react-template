import { memo, useEffect } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import { type TableInstance } from '../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'h_scrollbar' | 'v_scrollbar' | 'bordered' | 'hScrollbarRef' | 'bodyRef' | 'headRef'>>;

const ScrollbarH = <T,>(props: Props<T>) => {
	const { h_scrollbar, v_scrollbar, bordered, hScrollbarRef, bodyRef, headRef } = props;

	useEffect(() => {
		if (h_scrollbar.have && hScrollbarRef.current) {
			const hScrollbar = hScrollbarRef.current;
			const handleScroll = () => {
				requestAnimationFrame(() => {
					if (headRef.current && headRef.current.scrollLeft !== hScrollbar.scrollLeft) {
						headRef.current.scrollLeft = hScrollbar.scrollLeft;
					}
					if (bodyRef.current && bodyRef.current.scrollLeft !== hScrollbar.scrollLeft) {
						bodyRef.current.scrollLeft = hScrollbar.scrollLeft;
					}
				});
			};
			hScrollbar.addEventListener('scroll', handleScroll, { passive: true });

			return () => {
				hScrollbar.removeEventListener('scroll', handleScroll);
			};
		}
	}, [h_scrollbar.have]);

	if (h_scrollbar.have && h_scrollbar.width > 0) {
		return (
			<div className={styles['virtual-h-scrollbar-wrapper']}>
				<div
					ref={hScrollbarRef}
					className={classNames(styles['virtual-h-scrollbar'], { [styles['bordered']]: bordered })}
					style={{ height: h_scrollbar.width, minHeight: h_scrollbar.width, maxHeight: h_scrollbar.width }}
				>
					<div
						className={styles['h-scrollbar-inner']}
						style={{
							width: h_scrollbar.innerSize,
							height: h_scrollbar.width,
							minHeight: h_scrollbar.width,
							maxHeight: h_scrollbar.width,
						}}
					/>
				</div>
				{v_scrollbar.have && <div style={{ flexShrink: 0, width: v_scrollbar.width, backgroundColor: 'var(--table-scroll-bar-bg)' }} />}
			</div>
		);
	}

	if (h_scrollbar.have && h_scrollbar.width === 0) {
		return (
			<div ref={hScrollbarRef} className={styles['virtual-h-scrollbar-wrapper-absolute']}>
				<div className={styles['h-scrollbar-absolute-inner']} style={{ width: h_scrollbar.innerSize }} />
			</div>
		);
	}

	return null;
};

export default memo(ScrollbarH) as typeof ScrollbarH;
