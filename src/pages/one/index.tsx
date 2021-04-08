import React, { FC, useState } from 'react'
// import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'
// import LazyLoad from '@/components/lazy_load'
import DropDown from '@/components/drop_down'
import styles from './index.less'

// const Three = LazyLoad(() => import('../three'))

const One: FC = () => {
    const [data, setData] = useState('okk')

    // const history = useHistory()
    // const location = useLocation()
    // const params = useParams()
    // const match = useRouteMatch('/one')

    return (
        <div>
            <div
                className={styles.wrapper}
                onClick={() => {
                    setData(data === 'okk' ? 'ok' : 'okk')
                }}
            >
                Oneas
            </div>
            {/* <Three data={data} /> */}
            <DropDown>
                <div className={styles['btn']}>bt1n</div>
            </DropDown>
        </div>
    )
}

export default One
