import React, { FC, useEffect, useState } from 'react'
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import LazyLoad from '@/components/lazy_load'
import styles from './index.less'

const Three = LazyLoad(() => import('../three'))

const One: FC = () => {
    const [data, setData] = useState('okk')

    const history = useHistory()
    const location = useLocation()
    const params = useParams()
    const match = useRouteMatch('/one')

    return (
        <div>
            <div
                className={styles.wrapper}
                onClick={() => {
                    setData(data === 'okk' ? 'ok' : 'okk')
                }}
            >
                One
            </div>
            <Three data={data} />
        </div>
    )
}

export default One
