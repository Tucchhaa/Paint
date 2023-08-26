import { JetPublicComponent } from './jet_component';

/**
 * Used to subscribe to events, that will be raised soon
 */
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

/**
 * Type of HTML event hadnler passed to state options
 */
export type EventHandler<TNativeEvent> = (event: TNativeEvent, component: JetPublicComponent) => void;
