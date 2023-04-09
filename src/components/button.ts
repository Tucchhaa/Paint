import { Component } from "./core/component";
import { View, Controller } from "./core/module";
import { BaseOptions, Model } from "./core/model";


class ButtonOptions extends BaseOptions {
    disabled?: boolean = false;
    onClick?: (event: MouseEvent) => void;
    text?: string = '';
    title?: string = '';
}

class ButtonModel extends Model<ButtonOptions> {
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

    constructor(options?: ButtonOptions) {
        super(options);
    }

    protected getDefaultOptions(): ButtonOptions {
        return new ButtonOptions();
    }
}

class ButtonController extends Controller<ButtonModel> {
    public onClick(event: MouseEvent) {
        if(this.model.disabled === false) {
            this.model.onClick(event);
        }
    }
}

class ButtonView extends View<ButtonModel> {
    private _controller?: ButtonController;
    private get controller() {
        return this._controller!;
    }

    public initialize() {
        this._controller = this.getController(ButtonController) as ButtonController;

        this.render(this.component.container);
    }

    private render(container: HTMLElement) {
        if(this.model.visible) {
            const button = document.createElement("button");

            button.innerText = this.model.text;
            button.disabled = this.model.disabled;
            button.title = this.model.title;

            if(this.model.width) {
                button.style.width = this.model.width + 'px';
            }
            if(this.model.height) {
                button.style.height = this.model.height + 'px';
            }

            button.addEventListener('click', this.controller.onClick.bind(this));

            container.appendChild(button);
        }
    }
}

export class Button extends Component<ButtonModel> {
    constructor(container: HTMLElement | null, options?: ButtonOptions) {
        const model = new ButtonModel(options);

        super("Button", container, model, ButtonView, ButtonController);
    }
}