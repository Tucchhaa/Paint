import { Model } from "../model";
import { JetComponent } from "../jet-component";
import { InfernoComponentType } from "./inferno";

export type ComponentViewType<TModel extends Model> = InfernoComponentType<TModel>;

export abstract class ComponentViewManager<TModel extends Model> {
    protected container!: HTMLElement;
    constructor(
        protected componentView: ComponentViewType<TModel>,
        protected component: JetComponent<TModel>,
        protected model: TModel
    ) { }

    public render(container: HTMLElement) {
        this.container = container;
    }
    public abstract update(): void;
}
