import { useCallback, useEffect, useRef, useState } from 'react';

type Options = {
    onMessage?: (ev: MessageEvent) => any; // 接收消息回调
    onOpen?: () => any; // 第一次打开回调
    heartBreak?: boolean; // 是否要心跳
};

const useWebsocket = (url: string, options?: Options) => {
    const [ws, setWs] = useState<WebSocket | null>(null);

    const { heartBreak = true, onMessage = null, onOpen = null } = options || {};
    const closeWsTimeout = useRef<NodeJS.Timeout>(); // 关闭timeout
    const heartBreakTimeout = useRef<NodeJS.Timeout>(); // 心跳timeout
    const closeWsTime = 4000; // 关闭延迟
    const heartBreakTime = 5000; //心跳间隔
    const heartBreakText = 'heart break'; // 心跳文本
    const noHeartBreakCloseCode = 3002; // 心跳关闭code
    const normalCloseCode = 3001; // 正常关闭code
    const maxReConnect = 10; // 最大重连次数
    const [reTry, setReTry] = useState(0); // 重连次数

    // 清除关闭ws timeout
    const clearCloseWs = useCallback(() => {
        if (closeWsTimeout.current) {
            clearTimeout(closeWsTimeout.current);
        }
    }, []);

    // 清除心跳 timeout
    const clearHeartBreak = useCallback(() => {
        if (heartBreakTimeout.current) {
            clearTimeout(heartBreakTimeout.current);
        }
    }, []);

    // 发送心跳
    const getSendHeartBreak = useCallback(
        (_ws: WebSocket) => {
            return () => {
                _ws.send(heartBreakText);

                clearCloseWs();

                closeWsTimeout.current = setTimeout(() => {
                    _ws.close(noHeartBreakCloseCode);
                }, closeWsTime);
            };
        },
        [clearCloseWs],
    );

    // 循环发送心跳
    const LoopSendHeartBreak = useCallback(
        (_ws: WebSocket) => {
            const sendHeartBreak = getSendHeartBreak(_ws);
            sendHeartBreak();
            heartBreakTimeout.current = setTimeout(() => {
                LoopSendHeartBreak(_ws);
            }, heartBreakTime);
        },
        [getSendHeartBreak],
    );

    // 初始化ws处理函数
    const initWsHandle = useCallback(
        (_ws: WebSocket) => {
            _ws.onopen = () => {
                if (heartBreak) {
                    LoopSendHeartBreak(_ws);
                }
                if (onOpen !== null) {
                    onOpen();
                }
                console.log(`websocket ${_ws.url} 已连接`);
            };

            _ws.onclose = (e: CloseEvent) => {
                if (heartBreak) {
                    clearCloseWs();
                    clearHeartBreak();
                }
                // 非正常关闭 重连
                if (e?.code !== normalCloseCode) {
                    setReTry((r) => r + 1);
                }
                console.log(`websocket ${_ws.url} 已关闭 code: ${e?.code}`);
            };

            _ws.onerror = (e) => {
                console.log(`websocket ${_ws.url} 报错 event: ${e}`);
            };
        },
        [LoopSendHeartBreak, clearHeartBreak, clearCloseWs, onOpen, heartBreak],
    );

    // 初始化ws
    useEffect(() => {
        if (reTry <= maxReConnect) {
            if (reTry > 0) {
                console.log(`websocket 重连: ${reTry}`);
            }
            if (window.WebSocket) {
                const newWs = new window.WebSocket(url);
                initWsHandle(newWs);
                setWs(newWs);
            } else {
                console.log('浏览器不支持websocket');
            }
        }
    }, [initWsHandle, url, reTry]);

    // ws绑定 onmessage
    useEffect(() => {
        if (ws !== null) {
            if (onMessage !== null) {
                ws.addEventListener('message', (e) => {
                    if (heartBreak) {
                        if (e.data === heartBreakText) {
                            clearCloseWs();
                        } else {
                            onMessage(e);
                        }
                    } else {
                        onMessage(e);
                    }
                });
            }
        }
    }, [ws, onMessage, clearCloseWs, heartBreak]);

    // 封装send
    const send = useCallback(
        (data: string | ArrayBufferLike | Blob | ArrayBufferView) => {
            if (ws !== null && ws.readyState === 1) {
                ws.send(data);
            } else {
                console.log('websocket 未连接');
            }
        },
        [ws],
    );

    // 封装close
    const close = useCallback(
        (code: number = normalCloseCode) => {
            if (ws !== null && ws.readyState === 1) {
                ws.close(code);
            }
        },
        [ws],
    );

    // 取消挂载 close
    useEffect(() => {
        return () => {
            close();
        };
    }, [ws, close]);

    return [{ send, close, ws }];
};

export default useWebsocket;
