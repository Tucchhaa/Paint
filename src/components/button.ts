import { Component } from "./core/component";
import { Model, View, Controller } from "./core/module"

class ButtonModel extends Model {

}

class ButtonController extends Controller {

}

class ButtonView extends View {
    public initialize() {
        this.render(this.component.container);
        const controller = this.getController(ButtonController);
    }

    private render(container: HTMLElement) {
        const button = document.createElement("button");

        button.innerText = "button";

        container.appendChild(button);
    }
}

export class Button extends Component {
    constructor(container?: HTMLElement | null) {
        super("Button", container, ButtonModel, ButtonView, ButtonController);
    }
}