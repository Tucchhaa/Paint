import { Icon } from 'components/icon';
import { EventHandler } from 'core/event';
import { BaseState, Model, model, stateProperty } from 'core/model';
import { noop } from 'utils/helpers';

export type ButtonStyle = 'filled' | 'tonal' | 'outlined' | 'text';

export type ButtonState = BaseState & Partial<{
    onClick: EventHandler<MouseEvent>;
    
    text: string;
    
    style: ButtonStyle;

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
    public icon?: Icon;
}