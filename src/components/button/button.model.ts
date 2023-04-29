import { BaseOptions, Model } from "../core/model";

export type ButtonStyleMode = 'text' | 'contained' | 'outline';

export class ButtonOptions extends BaseOptions {
    disabled?: boolean = false;
    onClick?: (event: MouseEvent) => void;
    text?: string = '';
    title?: string = '';
    styleMode?: ButtonStyleMode = 'contained';
}

export class ButtonModel extends Model<ButtonOptions> {
    public get disabled() {
        return this.options.disabled!;
    }

    public get onClick() {
        return this.options.onClick!;
    }

    public get text() {
        return this.options.text!;
    }

    public get title() {
        return this.options.title!;
    }

    public get styleMode() {
        return this.options.styleMode!;
    }

    constructor(options?: ButtonOptions) {
        super(options);
    }

    protected getDefaultOptions(): ButtonOptions {
        return new ButtonOptions();
    }
}