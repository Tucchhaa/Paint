import { isDefined } from 'utils/helpers';
import { ModelEvents } from './types';
import { useContext } from './decorators';

export abstract class Model {
    public readonly events: ModelEvents = new ModelEvents();

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

    constructor(state?: any) { }

    public assignState(state?: any) {
        if(!isDefined(state))
            return;
        
        for(const [key, value] of Object.entries(state)) {
            (this as any)[key] = value;
        }
    }
}
