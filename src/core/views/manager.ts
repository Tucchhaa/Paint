import { JetComponent } from 'core';
import { InfernoComponent, InfernoProps } from './inferno';

export type ComponentViewType = new(props: InfernoProps) => InfernoComponent;

export abstract class ComponentViewManager {
    protected container!: HTMLElement;

    protected get model() {
        return this.component.model;
    }

    constructor(
        protected componentView: ComponentViewType, 
        protected component: JetComponent
    ) { }

    public render(container: HTMLElement) {
        this.container = container;
    }

    public abstract onStateUpdate(): void;

    public abstract onDataChange(): void;
}
