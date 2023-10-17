import { JetComponent, View } from 'core';
import { JetInfernoComponent, InfernoProps } from './inferno';

export type ComponentViewType = new(props: InfernoProps) => JetInfernoComponent;

export abstract class ComponentViewManager {
    protected component: JetComponent;

    protected container!: HTMLElement;

    protected get model() {
        return this.component.model;
    }

    constructor(
        protected view: View,
        protected componentView: ComponentViewType
    ) {
        this.component = view.component;
    }

    public render(container: HTMLElement) {
        this.container = container;
    }

    public abstract onStateUpdate(): void;

    public abstract onDataChange(): void;
}
