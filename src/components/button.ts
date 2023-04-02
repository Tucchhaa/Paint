import { Component, View } from "../components/core/component";

class ButtonView extends View {
    constructor(component: Component) {
        super('baseView', component);
    }

    public initialize() {
        this.render(this.component.container);
    }

    private render(container: HTMLElement) {
        const button = document.createElement("button");

        button.innerText = "button";

        container.appendChild(button);
    }
}

export class Button extends Component {
    constructor(container?: HTMLElement | null) {
        super("Button", container, undefined, ButtonView);
    }
}