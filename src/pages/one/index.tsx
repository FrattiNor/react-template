import React, { FC } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import ReactLazyLoad from '@/components/react_lazy_load'
import styles from './index.less'

const Three = ReactLazyLoad(() => import('../three'))

const One: FC<RouteComponentProps> = ({ history }) => {
    return (
        <div>
            <div className={styles.wrapper} onClick={() => history.push('/two')}>
                One
            </div>
            <Three />
        </div>
    )
}

export default withRouter(One)
