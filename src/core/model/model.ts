import { isDefined } from 'utils/helpers';
import { BaseState, ModelEvents } from './types';
import { stateProperty, useContext } from './decorators';

export abstract class Model<TState extends BaseState = BaseState> implements Required<BaseState> {
    public readonly events: ModelEvents = new ModelEvents();

    // ===
    // Default field descriptors
    // ===

    @stateProperty
    public height: number | string = 'auto';

    @stateProperty
    public width: number | string = 'auto';
    
    @stateProperty
    public disabled: boolean = false;

    // ===

    @useContext
    onPropertyValueChanged(propertyKey: string, value: any, prevValue: any) {
        // this.events is undefined when setting declaring values of Model
        this.events?.update.emit({
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
