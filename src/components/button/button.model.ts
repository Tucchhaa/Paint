import { BaseState, Model, stateProperty } from "core/model";
import { noop } from "utils/helpers";

export type ButtonStyleMode = 'text' | 'contained' | 'outline';

export type ButtonState = BaseState & Partial<{
    onClick: (event: MouseEvent) => void;
    
    text: string;
    
    title: string;
    
    styleMode: ButtonStyleMode;
}>;

export class ButtonModel extends Model<ButtonState> {
    @stateProperty
    public onClick: (event: MouseEvent) => void = noop;
    
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