import { useEffect, useRef, useState } from 'react'
import { judge } from './animate'
import { linear } from './timing'
import { useAnimateData, Option, State, Draw } from './types'

const useAnimate = (draw: Draw, duration: number, _option?: Option) => {
    // 记录requestAnimationFrame
    const timeout = useRef<number | null>(null)
    // 拆解option
    const option = _option || {}
    // timing函数
    const timing = typeof option.timing === 'function' ? option.timing : null
    // 延迟
    const [delay, setDelay] = useState(typeof option.delay === 'number' ? option.delay : 0)
    // 次数
    const [count, setCount] = useState(typeof option.count === 'number' || option.count === 'infinite' ? option.count : 1)
    // 是否绘制过（首帧，延迟需要先绘制首帧）
    const [drawn, setDrawn] = useState(false)
    // 动画开始时间（毫秒）
    const [start, setStart] = useState(0)
    // 暂停时的Progress
    const [beforeProgress, setBeforeProgress] = useState(0)
    // 当前的Progress
    const [currentProgress, setCurrentProgress] = useState(0)
    // 动画状态
    const [state, setState] = useState<State>('default')

    // 动画函数
    const animate = (time: number) => {
        // 计算当前进度
        let progress = (time - start - delay) / duration + beforeProgress
        // 进度最大为1（0 -> 1）
        if (progress > 1) progress = 1
        // 记录当前进度(小于0为延迟，不记录)
        if (progress >= 0) {
            setCurrentProgress(progress)
        }
        // 根据timing函数获取进度（实现 ease等效果）
        const timingProgress = timing !== null ? timing(progress) : linear(progress)
        // 根据进度绘制，延迟时进度小于0，需要绘制首帧
        if (progress >= 0) {
            draw(timingProgress)
        } else if (!drawn) {
            setDrawn(true)
            draw(0)
        }
        // 如果进度没有到1，继续绘制下一帧动画
        // 进度完毕后判断是否需要多次执行
        if (progress < 1) {
            timeout.current = window.requestAnimationFrame(animate)
        } else if (count === 'infinite' || count - 1 > 0) {
            if (typeof count === 'number') {
                setCount(count - 1)
            }
            setDelay(0)
            setCurrentProgress(0)
            setStart(window.performance.now())
            timeout.current = window.requestAnimationFrame(animate)
        }
    }

    // 暂停
    const pause = () => {
        if (state !== 'paused') {
            if (timeout.current !== null) {
                window.cancelAnimationFrame(timeout.current)
                setDelay(0)
                setBeforeProgress(currentProgress)
                setState('paused')
            }
        }
    }

    // 播放
    const play = () => {
        if (state !== 'playing') {
            const newStart = window.performance.now()
            setStart(newStart)
            setState('playing')
        }
    }

    // state 改变回调，开启下一帧绘画，需要在状态更改后
    useEffect(() => {
        if (state === 'playing') {
            timeout.current = window.requestAnimationFrame(animate)
        }
    }, [state])

    // 默认播放
    useEffect(() => {
        if (judge()) {
            play()
        }
    }, [])

    const res: useAnimateData = {
        pause,
        play,
        state,
        progress: currentProgress
    }

    return [res]
}

export default useAnimate
