import { cronType } from './const';

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

interface MinMaxType {
    min: number;
    max: number;
}

// 周期
export interface PeriodType {
    second: MinMaxType;
    minute: MinMaxType;
    hour: MinMaxType;
    day: MinMaxType;
    month: MinMaxType;
    week: MinMaxType;
    year: MinMaxType;
}

interface StartEndType {
    start: number;
    end: number;
}

// 从 ... 开始
export interface LoopType {
    second: StartEndType;
    minute: StartEndType;
    hour: StartEndType;
    day: StartEndType;
    month: StartEndType;
    week: StartEndType;
    year: StartEndType;
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
