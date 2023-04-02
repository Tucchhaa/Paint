import { deepExtend } from "../../helpers";

export abstract class Model<TOptions extends object = object> {
    protected options: TOptions;
    constructor(options?: TOptions) {
        this.options = deepExtend({}, this.getDefaultOptions(), options || {}) as TOptions;
    }

    protected abstract getDefaultOptions(): TOptions;
}