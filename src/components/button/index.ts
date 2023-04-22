import { ButtonModel, ButtonOptions } from "./button.model";
import { JetComponent } from "../core";
import { ButtonController } from "./button.controller";

import { ButtonView } from "./button.view";

export class Button extends JetComponent<ButtonModel> {
    constructor(container: HTMLElement | null, options?: ButtonOptions) {
        const model = new ButtonModel(options);

        super("Button", container, model, ButtonView, ButtonController);
    }
}