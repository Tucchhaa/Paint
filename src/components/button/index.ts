import { ButtonModel, ButtonState } from './button.model';
import { View, JetComponent } from 'core';
import { ButtonController } from './button.controller';
import { ButtonInfernoView } from './button.inferno';

export class ButtonView extends View<ButtonModel> {
    initialize() {
        this.setView(ButtonInfernoView);
    }
}

export class Button extends JetComponent<ButtonModel> {
    public static readonly componentName: string = 'Button';

    constructor(state?: ButtonState) {
        super(new ButtonModel(state));
    }

    protected registerModules(): void {
        this.registerView(new ButtonView(this));
        this.registerController(new ButtonController(this));
    }

    public static render(container: HTMLElement, state?: ButtonState): void {
        (new Button(state)).render(container);
    }
}