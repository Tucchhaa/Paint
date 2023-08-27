import { isDefined } from 'utils/helpers';
import { BaseState, ModelEvents } from './types';
import { stateProperty, useContext } from './decorators';

export abstract class Model<TState extends BaseState = BaseState> {
    public readonly events: ModelEvents = new ModelEvents();

    // ===
    // Default field descriptors
    // ===

    @stateProperty
    public height?: number;

    @stateProperty
    public width?: number;
    
    @stateProperty
    public disabled: boolean = false;

    // ===

    @useContext
    private onPropertyValueChanged(propertyKey: string, value: any, prevValue: any) {
        this.events.update.emit({
            name: propertyKey,
            value,
            prevValue,
        });
    }

    // ===

    constructor(state?: TState) { }

    public assignState(state?: TState) {
        if(!isDefined(state))
            return;
        
        for(const [key, value] of Object.entries(state)) {
            (this as any)[key] = value;
        }
    }
}
