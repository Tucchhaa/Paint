import { Icon } from 'components/icon';
import { EventHandler } from 'core/event';
import { BaseState, Model, model, stateProperty } from 'core/model';
import { noop } from 'utils/helpers';

export type ButtonStyle = 'filled' | 'outlined' | 'text';

export type ButtonState = BaseState & Partial<{
    fontSize: number;

    onClick: EventHandler<MouseEvent>;
    
    text: string;
    
    style: ButtonStyle;

    elevated: boolean;

    icon: Icon;
}>;

@model
export class ButtonModel extends Model<ButtonState> {
    @stateProperty
    public height: number = 40;

    @stateProperty
    public fontSize: number = 14;

    @stateProperty
    public onClick: EventHandler<MouseEvent> = noop;
    
    @stateProperty
    public text: string = '';
    
    @stateProperty
    public style: ButtonStyle = 'filled';

    @stateProperty
    public elevated: boolean = false;

    @stateProperty
    public icon?: Icon;
}