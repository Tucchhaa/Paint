export class JetEvent<THandlerArg = any> {
    private handlers: any[] = [];

    on(handler: (arg: THandlerArg) => void) {
        this.handlers.push(handler);
    }

    emit(arg: THandlerArg) {
        for(const handler of this.handlers) {
            handler(arg);
        }
    }
}