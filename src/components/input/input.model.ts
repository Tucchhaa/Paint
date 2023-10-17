import { EventHandler as JetEventHandler } from 'core/event';
import { BaseState, Model, model, stateProperty } from 'core/model';
import { FormEvent } from 'inferno';
import { noop } from 'utils/helpers';

export type InputStyle = 'filled' | 'outlined';

export type InputState = BaseState & Partial<{
    label: string;

    name: string;

    value: string;

    onValueChange: JetEventHandler<FormEvent<HTMLInputElement>>;

    style: InputStyle;

    disabled: boolean;
}>;

@model
export class InputModel extends Model<InputState> {
    @stateProperty
    public label: string = '';

    @stateProperty
    public name?: string = undefined;

    @stateProperty
    public value: string = '';

    @stateProperty
    public onValueChange: JetEventHandler<FormEvent<HTMLInputElement>> = noop;

    @stateProperty
    public style: InputStyle = 'filled';

    @stateProperty
    public disabled: boolean = false;
}
