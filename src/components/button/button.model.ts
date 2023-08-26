import { EventHandler } from 'core/event';
import { BaseState, Model, model, stateProperty } from 'core/model';
import { noop } from 'utils/helpers';

export type ButtonStyleMode = 'text' | 'contained' | 'outline';

export type ButtonState = BaseState & Partial<{
    onClick: EventHandler<MouseEvent>;
    
    text: string;
    
    title: string;
    
    styleMode: ButtonStyleMode;
}>;

@model
export class ButtonModel extends Model<ButtonState> implements ButtonState {
    @stateProperty
    public onClick: EventHandler<MouseEvent> = noop;
    
    @stateProperty
    public text: string = '';
    
    @stateProperty
    public title: string = '';
    
    @stateProperty
    public styleMode: ButtonStyleMode = 'contained';

    constructor(state?: ButtonState) {
        super(state);

        this.assignState(state);
    }
}