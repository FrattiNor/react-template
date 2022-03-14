export type State = 'playing' | 'paused' | 'default'

export type Draw = (progress: number) => void

export type Option = {
    timing?: (progress: number) => number
    delay?: number
    count?: number | 'infinite'
}

export type Animate = {
    pause: () => State
    play: () => State
    state: State
    progress: number
}

export type useAnimateData = Pick<Animate, 'progress' | 'state'> & {
    pause: () => void
    play: () => void
}
