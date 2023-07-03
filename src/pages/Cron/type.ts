import { cronType } from './useData';

export type CronType = (typeof cronType)[number];

//
export interface RadioType {
    second: number;
    minute: number;
    hour: number;
    day: number;
    month: number;
    week: number;
    year: number;
}

export interface PeriodValue {
    start: number;
    end: number;
}

// 周期
export interface PeriodType {
    second: PeriodValue;
    minute: PeriodValue;
    hour: PeriodValue;
    day: PeriodValue;
    month: PeriodValue;
    week: PeriodValue;
    year: PeriodValue;
}

export interface LoopValue {
    start: number;
    loop: number;
}

// 从 ... 开始
export interface LoopType {
    second: LoopValue;
    minute: LoopValue;
    hour: LoopValue;
    day: LoopValue;
    month: LoopValue;
    week: LoopValue;
    year: LoopValue;
}

// 指定
export interface PointType {
    second: string;
    minute: string;
    hour: string;
    day: string;
    month: string;
    week: string;
    year: string;
}
