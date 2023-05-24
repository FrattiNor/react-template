import { ContentItem, Props } from './type';
import styles from './index.module.less';
import classNames from 'classnames';
import { FC, useMemo } from 'react';

const Skeleton: FC<Props> = ({ children, className, style, loading, padding, content, count }) => {
    const _content = useMemo(
        () =>
            content ||
            ([
                'title',
                ...Array(count ?? 3)
                    .fill('')
                    .map(() => 'paragraph'),
            ] as ContentItem[]),
        [JSON.stringify(content), count],
    );

    const _padding = useMemo(() => padding || ['top', 'left', 'right', 'bottom'], [JSON.stringify(padding)]);

    return (
        <div className={classNames(styles['skeleton'], className)} style={style}>
            {children}

            {loading && (
                <div
                    className={classNames(
                        styles['skeleton-loading'],
                        _padding.map((item) => styles[item]),
                    )}
                >
                    {_content.map((item, i) => (
                        <div key={i} className={styles[item]} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Skeleton;
