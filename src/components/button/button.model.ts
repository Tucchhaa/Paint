import { BaseOptions, Model } from "../core/model";

export type ButtonStyleMode = 'text' | 'contained' | 'outline';

export class ButtonOptions extends BaseOptions {
    onClick?: (event: MouseEvent) => void;
    text?: string = '';
    title?: string = '';
    styleMode?: ButtonStyleMode = 'contained';
}

export class ButtonModel extends Model<ButtonOptions> {
    public onClick!: (event: MouseEvent) => void;
    public text!: string;
    public title!: string;
    public styleMode!: ButtonStyleMode;

    constructor(options?: ButtonOptions) {
        super(options);
    }

    protected getDefaultOptions(): ButtonOptions {
        return new ButtonOptions();
    }
}