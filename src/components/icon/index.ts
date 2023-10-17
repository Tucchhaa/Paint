import { View, JetComponent } from 'core';
import { IconModel, IconState } from './icon.model';
import { IconInfernoView } from './icon.inferno';

export class IconView extends View<IconModel> {
    initialize() {
        this.setView(IconInfernoView);
    }
}

export class Icon extends JetComponent<IconModel> {
    public static readonly componentName: string = 'Icon';

    constructor(state?: IconState) {
        super(new IconModel(state));
    }

    protected registerModules(): void {
        this.registerView(new IconView(this));
    }

    public static render(container: HTMLElement, state?: IconState): void {
        (new Icon(state)).render(container);
    }
}