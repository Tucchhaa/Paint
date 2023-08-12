import { ButtonModel, ButtonOptions } from "./button.model";
import { View, JetComponent } from "core";
import { ButtonController } from "./button.controller";
import { ButtonInfernoView } from "./button.inferno.view";

class ButtonView extends View<ButtonModel> {
    initialize() {
        this.setView(ButtonInfernoView);
    }
}

export class Button extends JetComponent<ButtonModel> {
    constructor(container: HTMLElement, options?: ButtonOptions) {
        const model = new ButtonModel(options);

        super("Button", container, model);
    }

    protected registerModules(): void {
        this.registerView(new ButtonView(this));
        this.registerController(new ButtonController(this));
    }
}