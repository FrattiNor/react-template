import type { HtmlHTMLAttributes, ReactNode } from 'react';
import { createElement, Fragment, type PropsWithChildren } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import Loading from './Loading';

import type { LoadingProps } from './Loading';

type Props1 = PropsWithChildren<
    HtmlHTMLAttributes<HTMLDivElement> & {
        component?: 'div' | 'span';
        loading?: boolean;
    }
>;

type Props2 = PropsWithChildren<
    HtmlHTMLAttributes<HTMLDivElement> & {
        component?: 'div' | 'span';
        loadingProps?: LoadingProps;
    }
>;

function LoadingDiv(props: Props1): ReactNode | null;

function LoadingDiv(props: Props2): ReactNode | null;

function LoadingDiv(props: Props1 | Props2) {
    // @ts-ignore
    const { loading: __loading, loadingProps: __loadingProps, component = 'div', children, ...divProps } = props;

    const _loading = __loading as Props1['loading'];

    const _loadingProps = __loadingProps as Props2['loadingProps'];

    const type = typeof _loadingProps?.type === 'string' ? _loadingProps?.type : undefined;

    const loading = typeof _loading === 'boolean' ? _loading : typeof _loadingProps?.loading === 'boolean' ? _loadingProps?.loading : undefined;

    const maxHeight = typeof _loadingProps?.maxHeight === 'number' || _loadingProps?.maxHeight === 'unset' ? _loadingProps?.maxHeight : undefined;

    return createElement(component, {
        ...divProps,
        className: classNames(styles['loading-div'], divProps.className, { [styles['loading']]: loading === true }),
        children: (
            <Fragment>
                {children}
                {loading === true && <Loading type={type} loading={loading} maxHeight={maxHeight} />}
            </Fragment>
        ),
    });
}

export default LoadingDiv;
