import { EventHandler as JetEventHandler } from 'core/event';
import { BaseState, Model, model, stateProperty } from 'core/model';
import { FormEvent } from 'inferno';
import { noop } from 'utils/helpers';

export type InputState = BaseState & Partial<{
    label: string;

    name: string;

    value: string;

    onValueChange: JetEventHandler<FormEvent<HTMLInputElement>>;
}>;

@model
export class InputModel extends Model<InputState> implements InputState {
    @stateProperty
    public label: string = '';

    @stateProperty
    public name?: string = undefined;

    @stateProperty
    public value: string = '';

    @stateProperty
    public onValueChange: JetEventHandler<FormEvent<HTMLInputElement>> = noop;

    constructor(options?: InputState) {
        super(options);

        this.assignState(options);
    }
}
