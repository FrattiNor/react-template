import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import ReactLazyLoad from '@/components/lazy_load'
import styles from './index.less'

const Three = ReactLazyLoad(() => import('../three'), 'react')

const One: FC = () => {
    const history = useHistory()

    return (
        <div>
            <div className={styles.wrapper} onClick={() => history.push('/two')}>
                One
            </div>
            <Three />
        </div>
    )
}

export default One
