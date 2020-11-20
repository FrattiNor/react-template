import React, { FC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.less'

type Props = {}

const Two: FC<Props> = () => {
    const history = useHistory()

    useEffect(() => {
        console.log('two')
    }, [])

    return (
        <div className={styles.wrapper} onClick={() => history.push('/one')}>
            Two
        </div>
    )
}

export default Two
