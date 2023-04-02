import { Component } from "./core/component";
import { View, Controller } from "./core/module"
import { noop } from "../helpers";
import { Model } from "./core/model";


class ButtonOptions {
    text: string = '';
    onClick: (event: MouseEvent) => void = noop;
}

class ButtonModel extends Model<ButtonOptions> {
    public get text() {
        return this.options.text;
    }
    public get onClick() {
        return this.options.onClick;
    }

    constructor(options?: ButtonOptions) {
        super(options);
    }

    protected getDefaultOptions(): ButtonOptions {
        return new ButtonOptions();
    }
}

class ButtonController extends Controller<ButtonModel> {

}

class ButtonView extends View<ButtonModel> {
    private _controller?: ButtonController;
    private get controller() {
        return this._controller!;
    }

    public initialize() {
        this.render(this.component.container);

        this._controller = this.getController(ButtonController) as ButtonController;
    }

    private render(container: HTMLElement) {
        const button = document.createElement("button");

        button.innerText = this.model.text;
        button.addEventListener('click', this.model.onClick);

        container.appendChild(button);
    }
}

export class Button extends Component<ButtonModel> {
    constructor(container: HTMLElement | null, options?: ButtonOptions) {
        const model = new ButtonModel(options);

        super("Button", container, model, ButtonView, ButtonController);
    }
}