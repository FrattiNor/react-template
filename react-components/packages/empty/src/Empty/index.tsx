import { useTranslation } from '@pkg/i18n';
import styles from './index.module.less';
import { useTheme } from '@pkg/theme';
import { EmptyProps } from '../type';
import classNames from 'classnames';
import { FC } from 'react';

const Empty: FC<EmptyProps> = ({ description }) => {
    const { theme } = useTheme();
    const { t1 } = useTranslation();

    return (
        <div className={classNames(styles['empty'], styles[theme])}>
            <div className={styles['empty-image']}>
                <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(0 1)" fill="none" fillRule="evenodd">
                        <ellipse fill="var(--empty-fill)" cx="32" cy="33" rx="32" ry="7"></ellipse>
                        <g fillRule="nonzero" stroke="var(--empty-stroke)">
                            <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                            <path
                                d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                                fill="var(--empty-path-fill)"
                            ></path>
                        </g>
                    </g>
                </svg>
            </div>
            <div className={styles['empty-description']}>{description ?? t1('暂无数据')}</div>
        </div>
    );
};

export default Empty;