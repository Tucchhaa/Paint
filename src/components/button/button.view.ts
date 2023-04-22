import { View } from "../core";
import { ButtonModel } from "./button.model";
import { ButtonController } from "./button.controller";

export class ButtonView extends View<ButtonModel> {
    private controller!: ButtonController;

    public initialize() {
        this.controller = this.getController(ButtonController) as ButtonController;
    }

    public render(container: HTMLElement) {
        if (this.model.visible) {
            const button = document.createElement("button");

            button.innerText = this.model.text;
            button.disabled = this.model.disabled;
            button.title = this.model.title;

            if (this.model.width) {
                button.style.width = this.model.width + 'px';
            }
            if (this.model.height) {
                button.style.height = this.model.height + 'px';
            }

            button.addEventListener('click', this.controller.onClick.bind(this));

            container.appendChild(button);
        }
    }
}