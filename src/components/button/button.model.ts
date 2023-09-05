import { Icon } from 'components/icon';
import { EventHandler } from 'core/event';
import { BaseState, Model, model, stateProperty } from 'core/model';
import { isDefined, noop } from 'utils/helpers';

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
    /**
     * @default if button has text default value is 40, if not it is 'auto'
     */
    @stateProperty
    public height: number | 'auto';

    @stateProperty
    public fontSize: number = 14;

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

    constructor(state?: ButtonState) {
        super(state);

        this.height = isDefined(state?.text) ? 40 : 'auto';
    }
}