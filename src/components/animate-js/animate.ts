import { Animate, State, Option, Draw } from './types'
import { linear } from './timing'

export const judge = () => {
    // 判断浏览器支持
    if (window.performance) {
        return true
    } else {
        console.error('您的浏览器不支持 performance 接口')
        return false
    }
}

// 动画函数
const JsAnimate = (draw: Draw, duration: number, _option?: Option) => {
    // 判断浏览器支持
    if (judge()) {
        // 是否绘制过（首帧，延迟需要先绘制首帧）
        let drawn = false
        // 动画开始时间（毫秒）
        let start = window.performance.now()
        // 记录requestAnimationFrame
        let timeout: number | null = null
        // 暂停时的Progress
        let beforeProgress = 0
        // 当前的Progress
        let currentProgress = 0
        // 动画状态
        let state: State = 'start'
        // 拆解option
        const option = _option || {}
        // timing函数
        const timing = typeof option.timing === 'function' ? option.timing : null
        // 延迟
        let delay = typeof option.delay === 'number' ? option.delay : 0
        // 次数
        let count = typeof option.count === 'number' || option.count === 'infinite' ? option.count : 1
        // 是否执行过start
        let isStart = false
        // 动画开始钩子函数
        const onStart = typeof option.onStart === 'function' ? option.onStart : null
        // 是否执行过end
        let isEnd = false
        // 动画结束钩子函数
        const onEnd = typeof option.onEnd === 'function' ? option.onEnd : null

        // 动画函数
        const animate = (time: number) => {
            // console.log(start, time)
            // 计算当前进度
            let progress = (time - start - delay) / duration + beforeProgress
            // 进度最大为1（0 -> 1）
            if (progress > 1) progress = 1
            // 记录当前进度(小于0为延迟，不记录)
            if (progress >= 0) currentProgress = progress
            // 根据进度绘制，延迟时进度小于0，需要绘制首帧
            if (progress >= 0) {
                // 根据timing函数获取进度（实现 ease等效果）
                const timingProgress = timing !== null ? timing(progress) : linear(progress)
                draw(timingProgress)
                // start
                if (onStart !== null && !isStart) {
                    onStart()
                }
                isStart = true
            } else if (!drawn) {
                drawn = true
                draw(0)
            }
            // 如果进度没有到1，继续绘制下一帧动画
            // 进度完毕后判断是否需要多次执行
            if (progress < 1) {
                timeout = window.requestAnimationFrame(animate)
            } else if (count === 'infinite' || count - 1 > 0) {
                if (typeof count === 'number') count--
                delay = 0
                currentProgress = 0
                start = window.performance.now()
                timeout = window.requestAnimationFrame(animate)
            } else {
                if (onEnd !== null && !isEnd) {
                    // end
                    onEnd()
                }
                state = 'end'
                isEnd = true
            }
        }

        // 暂停
        const pause = () => {
            if (timeout !== null && state !== 'paused') {
                window.cancelAnimationFrame(timeout)
                // 暂停后清除暂停效果
                delay = 0
                beforeProgress = currentProgress
                state = 'paused'
            }

            return state
        }

        // 播放
        const play = () => {
            if (state !== 'playing') {
                start = window.performance.now()
                state = 'playing'
                timeout = window.requestAnimationFrame(animate)
            }

            return state
        }

        // 重置
        const reset = () => {
            if (state !== 'start') {
                if (timeout !== null) window.cancelAnimationFrame(timeout)
                state = 'start'
                delay = 0
                drawn = false
                beforeProgress = 0
                count = typeof option.count === 'number' || option.count === 'infinite' ? option.count : 1
                isStart = false
                isEnd = false
                play()
            }
        }

        // 默认执行
        play()

        // 返回Animate对象
        const res: Animate = {
            pause,
            play,
            reset,
            state,
            progress: currentProgress
        }

        return res
    } else {
        return null
    }
}

export default JsAnimate
