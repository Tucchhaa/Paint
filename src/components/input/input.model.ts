import { BaseOptions, Model } from "../core/model";
import { FormEvent } from "inferno";
import { noop } from "../../utils";

export class InputOptions extends BaseOptions {
    label?: string = '';
    name?: string = undefined;
    value?: string = '';
    onValueChange?: (event: FormEvent<HTMLInputElement>) => void = noop;
}

export class InputModel extends Model<InputOptions> {
    public label!: string;
    public name!: string;
    public value!: string;
    public onValueChange!: (event: FormEvent<HTMLInputElement>) => void;

    constructor(options?: InputOptions) {
        super(options);
    }

    protected getDefaultOptions(): InputOptions {
        return new InputOptions();
    }
}