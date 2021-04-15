import React from 'react'

type Props = {}

type State = {}

// 最外部的layout，负责获取全局的一些数据
class OutLayout extends React.PureComponent<Props, State> {
    // componentDidMount() {
    //     console.log('out')
    // }

    render() {
        return <>{this.props.children}</>
    }
}

export default OutLayout
