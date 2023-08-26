import { JetEvent } from 'core/event';

// ===
// Internal types
// ===

export class ModelEvents {
    public update = new JetEvent<StateUpdate>();
}

// ===
// Export types
// ===

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

