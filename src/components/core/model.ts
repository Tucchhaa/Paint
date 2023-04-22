import { deepExtend } from "../../utils";

export abstract class BaseOptions {
    height?: number;
    width?: number;
    visible?: boolean = true;
}

export abstract class Model<TOptions extends BaseOptions = BaseOptions> {
    protected options: TOptions;
    constructor(options?: TOptions) {
        this.options = deepExtend({}, this.getDefaultOptions(), options || {}) as TOptions;
    }

    protected abstract getDefaultOptions(): TOptions;

    public get height() {
        return this.options.height;
    }
    public get width() {
        return this.options.width;
    }
    public get visible() {
        return this.options.visible!;
    }
}