import { BaseState, Model, stateProperty } from "core/model";
import { FormEvent } from "inferno";
import { noop } from "utils/helpers";

export type InputState = BaseState & Partial<{
    label: string;

    name: string;

    value: string;

    onValueChange: (event: FormEvent<HTMLInputElement>) => void;
}>;

export class InputModel extends Model<InputState> implements InputState {
    @stateProperty
    public label: string = '';

    @stateProperty
    public name?: string = undefined;

    @stateProperty
    public value: string = '';

    @stateProperty
    public onValueChange: (event: FormEvent<HTMLInputElement>) => void = noop;

    constructor(options?: InputState) {
        super(options);

        this.assignState(options);
    }
}
