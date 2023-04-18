type QueenFun = ((...args: any) => void) | null;
type ListenQueen = Record<string, QueenFun[]>;

class EEvent {
    listenQueen: ListenQueen = {};

    // 支持 空格多事件
    getKey(key: string) {
        return key.split(' ');
    }

    on(key: string, value: () => void) {
        const keys = this.getKey(key);

        const stops = keys.map((_key) => {
            // 判断是否之前存在事件
            if (!this.listenQueen[_key]) this.listenQueen[_key] = [];
            // 事件队列
            const queen = this.listenQueen[_key];
            // 如果之前有空位就使用之前的 index
            const nullIndex = queen.findIndex((v) => v === null);
            // 获取当前事件的index
            const index = nullIndex !== -1 ? nullIndex : queen.length;
            // 设置value
            queen[index] = value;

            return () => {
                queen[index] = null;
            };
        });

        return () => {
            stops.forEach((stop) => stop());
        };
    }

    fire(key: string, ...rest: any) {
        const keys = this.getKey(key);
        keys.forEach((_key) => {
            if (this.listenQueen[_key]) {
                this.listenQueen[_key].forEach((v) => {
                    if (v !== null) {
                        v(rest);
                    }
                });
            }
        });
    }

    destroy() {
        this.listenQueen = {};
    }
}

export default EEvent;
