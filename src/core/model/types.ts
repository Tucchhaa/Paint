import { JetEvent } from 'core/event';
import { Model } from './model';

// ===
// Internal types
// ===

export class ModelEvents {
    public update = new JetEvent<StateUpdate>();
}

// ===
// Export types
// ===

export type State<T extends Model> = Omit<Partial<T>, 'events' | 'assignState' | 'onPropertyValueChanged'>; 

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

