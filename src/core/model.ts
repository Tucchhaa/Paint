import { deepExtend } from "utils/helpers";
import { JetComponent } from "./jet-component";
import { JetEvent } from "./event";

export abstract class BaseOptions {
    height?: number | string = 'auto';

    width?: number | string = 'auto';

    disabled?: boolean = false;
}

export type StateUpdate<T = any> = {
    name: string;
    value: T;
    prevValue: T;
};

class ModelEvents {
    public update = new JetEvent<StateUpdate>();
}

export abstract class Model<TOptions extends BaseOptions = BaseOptions> {
    // ===
    // Default state fields
    // ===

    public height!: number;

    public width!: number;
    
    public disabled!: boolean;

    // ===

    public events = new ModelEvents();

    protected constructor(options?: TOptions) {
        const processedOptions = deepExtend({}, this.getDefaultOptions(), options || {}) as TOptions;

        this.defineGettersSetters(processedOptions);
    }

    protected abstract getDefaultOptions(): TOptions;

    private defineGettersSetters(options: TOptions) {
        for(const key of Object.keys(options)) {
            let value = (options as any)[key];

            const getter = () => value;

            const setter = (newValue: any) => {
                const prevValue = value;
                value = newValue;

                this.events.update.emit({
                    name: key,
                    value: newValue,
                    prevValue,
                })
            };

            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,

                get: getter,
                set: setter,
            });
        }
    }
}
