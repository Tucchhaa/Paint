import { isDefined } from 'utils/helpers';
import { JetEvent } from './event';

export type BaseState = Partial<{
    height: number | string;

    width: number | string;

    disabled: boolean;
}>;

export type StateUpdate<T = any> = {
    /**
     * Name of state property
     */
    name: string;

    /**
     * Current value of state property
     */
    value: T;

    /**
     * Previous value of state property
     */
    prevValue: T;
};

class ModelEvents {
    public update = new JetEvent<StateUpdate>();
}

/**
 * Need this decorator because Model.onPropertyValueChanged is called inside 'stateProperty' decorator
 */
const useContext = (target: Model, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalValue = descriptor.value;

    descriptor.value = function(...args: any[]) {
        return originalValue.apply(this, args);
    };
};

export const stateProperty = (target: Model, propertyKey: string) => {
    let value: any;

    const getter = () => value;

    const setter = function (newValue: any) {
        const prevValue = value;
        value = newValue;

        // @ts-expect-error
        (this as Model).onPropertyValueChanged(propertyKey, value, prevValue);
    };

    Object.defineProperty(target, propertyKey, {
        enumerable: true,
        configurable: true,

        get: getter,
        set: setter,
    });
};

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

    protected assignState(state?: TState) {
        if(!isDefined(state))
            return;
        
        for(const [key, value] of Object.entries(state)) {
            (this as any)[key] = value;
        }
    }
}
