// 静态Option
export type VirtualCoreStaticOption = {
    // 是否是横向
    horizontal?: boolean;
    // 获取容器
    getContainer: () => HTMLDivElement | null;
};

// 可变Option
export type VirtualCoreChangeableOption = {
    // 数量
    count: number;
    // 头部额外距离
    startPadding?: number;
    // 尾部额外距离
    endPadding?: number;
    // 每行间距
    gap?: number;
    // 默认高度
    height: number;
    // 当range改变的回调
    onChange?: () => void;
};

// 全部Option
export type VirtualCoreOption = VirtualCoreStaticOption & VirtualCoreChangeableOption;

export type VirtualCoreState = {
    // 容器大小
    containerSize: number | undefined;
    // 容器偏移距离
    containerOffset: number | undefined;
    // 开始index
    startIndex: number | undefined;
    // 结束index
    endIndex: number | undefined;
    // index偏移量数组
    indexOffsets: IndexOffsetItem[] | undefined;
};

export type IndexOffsetItem = {
    start: number;
    end: number;
};
