export type State = 'playing' | 'paused' | 'start' | 'end'

export type Draw = (progress: number) => void

export type Option = {
    timing?: (progress: number) => number
    delay?: number
    count?: number | 'infinite'
    onStart?: () => void
    onEnd?: () => void
}

export type Animate = {
    reset: () => void
    pause: () => State
    play: () => State
    state: State
    progress: number
}

export type useAnimateData = Pick<Animate, 'progress' | 'state' | 'reset'> & {
    pause: () => void
    play: () => void
}
