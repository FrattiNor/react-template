import React, { FC } from 'react'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'

const Home: FC = () => {
    const history = useHistory()

    return <Button onClick={() => history.push('/home')}>App</Button>
}

export default Home
