import { cronType } from './useData';

export type CronType = (typeof cronType)[number];

//
export type RadioType = {
    [key in CronType]: number;
};

// 周期
export type PeriodType = {
    [key in CronType]: PeriodValue;
};

// 从 ... 开始
export type LoopType = {
    [key in CronType]: LoopValue;
};

// 指定
export type PointType = {
    [key in CronType]: number[];
};

export interface LoopValue {
    start: number;
    loop: number;
}

export interface PeriodValue {
    start: number;
    end: number;
}
