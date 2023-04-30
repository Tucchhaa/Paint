import { deepExtend } from "../../utils";
import { JetComponent } from "./jet-component";

export abstract class BaseOptions {
    height?: number | string = 'auto';
    width?: number | string = 'auto';
    disabled?: boolean = false;
}

export type StateUpdate = {
    name: string;
    value: any;
    prevValue: any;
};

export abstract class Model<TOptions extends BaseOptions = BaseOptions> {
    private component!: JetComponent;
    public setComponent(component: JetComponent) {
        this.component = component;
    }

    protected constructor(options?: TOptions) {
        const processedOptions = deepExtend({}, this.getDefaultOptions(), options || {}) as TOptions;

        this.defineGettersSetters(processedOptions);
    }


    protected abstract getDefaultOptions(): TOptions;

    private defineGettersSetters(options: BaseOptions) {
        for(const key of Object.keys(options)) {
            let value = (options as any)[key];

            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,

                get() {
                    return value;
                },
                set(newValue) {
                    const prevValue = value;
                    value = newValue;

                    this.component.stateUpdated({
                        name: key,
                        value: newValue,
                        prevValue,
                    });
                },
            });
        }
    }

    public height!: number;
    public width!: number;
    public disabled!: boolean;
}
