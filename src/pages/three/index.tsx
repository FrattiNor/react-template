import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.less'

type Props = {
    data: string
}

const One: FC<Props> = ({ data }) => {
    const history = useHistory()

    return (
        <div className={styles.wrapper} onClick={() => history.push('/two')}>
            {data}
        </div>
    )
}

export default One
