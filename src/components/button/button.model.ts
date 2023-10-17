import { Icon } from 'components/icon';
import { EventHandler } from 'core/event';
import { Model, State, model, stateProperty } from 'core/model';
import { noop } from 'utils/helpers';

export type ButtonStyle = 'filled' | 'outlined' | 'text';

export type ButtonState = State<ButtonModel>;

@model
export class ButtonModel extends Model {
    @stateProperty
    public onClick: EventHandler<MouseEvent> = noop;
    
    @stateProperty
    public text?: string;
    
    @stateProperty
    public style: ButtonStyle = 'filled';

    @stateProperty
    public elevated: boolean = false;

    @stateProperty
    public icon?: Icon;

    @stateProperty
    public disabled: boolean = false;
}