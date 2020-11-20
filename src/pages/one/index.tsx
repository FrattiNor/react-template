import React, { FC, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import LazyLoad from '@/components/lazy_load'
import styles from './index.less'

const Three = LazyLoad(() => import('../three'))

const One: FC<RouteComponentProps> = ({ history }) => {
    useEffect(() => {
        console.log('one')
    }, [])

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
