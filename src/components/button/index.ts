import { ButtonModel, ButtonOptions } from "./button.model";
import { Component } from "../core/component";
import { ButtonController } from "./button.controller";
import { ButtonView } from "./button.view";

export class Button extends Component<ButtonModel> {
    constructor(container: HTMLElement | null, options?: ButtonOptions) {
        const model = new ButtonModel(options);

        super("Button", container, model, ButtonView, ButtonController);
    }
}