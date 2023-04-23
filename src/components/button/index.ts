import { ButtonModel, ButtonOptions } from "./button.model";
import { InfernoView, JetComponent } from "../core";
import { ButtonController } from "./button.controller";
import { ButtonInfernoComponent } from "./button.view";

class ButtonView extends InfernoView<ButtonModel> {
    initialize() {
        this.setView(ButtonInfernoComponent);
    }
}

export class Button extends JetComponent<ButtonModel> {
    constructor(container: HTMLElement | null, options?: ButtonOptions) {
        const model = new ButtonModel(options);

        super("Button", container, model, ButtonView, ButtonController);
    }
}