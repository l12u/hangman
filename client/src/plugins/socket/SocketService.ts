type SocketEventType = "close" | "error" | "message" | "open";
type SocketEventPayloads = {
    "close": CloseEvent,
    "error": Event,
    "message": MessageEvent,
    "open": Event,
};
type SocketEventHandler<T extends SocketEventType> = (event: SocketEventPayloads[T]) => void;
type SocketEventHandlerRegistry = { [T in SocketEventType]?: SocketEventHandler<T>[] };

export class SocketService {
    private eventHandler: SocketEventHandlerRegistry = {};
    private socket: WebSocket | null = null;

    constructor() { }

    connect(url: string): void {
        this.socket = new WebSocket(url);

        this.socket.onclose = (ev) => this.eventHandler.close?.forEach((handler) => handler(ev));
        this.socket.onerror = (ev) => this.eventHandler.error?.forEach((handler) => handler(ev));
        this.socket.onmessage = (ev) => this.eventHandler.message?.forEach((handler) => handler(ev));
        this.socket.onopen = (ev) => this.eventHandler.open?.forEach((handler) => handler(ev));
    }

    off<T extends SocketEventType>(event: T, callback: SocketEventHandler<T>): void {
        if (!this.eventHandler[event]) return;

        const index = this.eventHandler[event]?.indexOf(callback as any);

        if (index == undefined || index < 0) return;
        this.eventHandler[event]?.splice(index, 1);
    }

    on<T extends SocketEventType>(event: T, callback: SocketEventHandler<T>): void {
        this.eventHandler[event] ||= [];
        this.eventHandler[event]?.push(callback as any);
    }

    once<T extends SocketEventType>(event: T, callback: SocketEventHandler<T>): void {
        const self = this;

        self.on(event, function (this: typeof callback, ev) {
            callback(ev);
            self.off(event, this)
        });
    }

    send(...args: Parameters<WebSocket["send"]>): void {
        this.socket?.send(args[0]);
    }
}