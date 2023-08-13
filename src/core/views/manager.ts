import { Model } from "../model";
import { JetComponent } from "../jet-component";
import { InfernoComponentType } from "./inferno";

export type ComponentViewType<TModel extends Model> = InfernoComponentType<TModel>;

export abstract class ComponentViewManager<TModel extends Model> {
    protected container!: HTMLElement;

    protected get model() {
        return this.component.model;
    }

    protected get dataSource() {
        return this.component.dataSource;
    }

    constructor(
        protected componentView: ComponentViewType<TModel>, 
        protected component: JetComponent<TModel>
    ) { }

    public render(container: HTMLElement) {
        this.container = container;
    }
    public abstract update(): void;
}
