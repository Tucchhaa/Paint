import { InputModel, InputState } from './input.model';
import { View, JetComponent } from 'core';
import { InputController } from './input.controller';
import { InputInfernoView } from './input.inferno';

class InputView extends View<InputModel> {
    initialize() {
        this.setView(InputInfernoView);
    }
}

export class Input extends JetComponent<InputModel> {
    public static readonly componentName: string = 'Input';

    constructor(state?: InputState) {
        super(new InputModel(state));
    }

    protected registerModules(): void {
        this.registerView(new InputView(this));
        this.registerController(new InputController(this));
    }

    public static render(container: HTMLElement, state?: InputState): void {
        (new Input(state)).render(container);
    }
}