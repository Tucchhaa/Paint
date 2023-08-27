import type { Model } from './model';

/**
 * Need this decorator because Model.onPropertyValueChanged is called inside 'stateProperty' decorator
 */
export const useContext = (target: Model, propertyKey: string, descriptor: PropertyDescriptor) => {
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

export const model = <T extends { new(...args: any[]): {} }>(constructor: T) => {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);

            const state = args[0];

            (this as any).assignState(state);
        }
    };
};
