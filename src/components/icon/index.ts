import { View, JetComponent } from 'core';
import { IconModel, IconState } from './icon.model';
import { IconInfernoView } from './icon.inferno';

class IconView extends View<IconModel> {
    initialize() {
        this.setView(IconInfernoView);
    }
}

export class Icon extends JetComponent<IconModel> {
    constructor(container: HTMLElement, state?: IconState) {
        const model = new IconModel(state);

        super('Icon', container, model);
    }

    protected registerModules(): void {
        this.registerView(new IconView(this));
    }
}