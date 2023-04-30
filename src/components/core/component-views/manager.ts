import { Model } from "../model";
import { JetComponent } from "../jet-component";
import { InfernoComponentType } from "./inferno";
import { DataSource } from "../data-source";

export type ComponentViewType<TModel extends Model> = InfernoComponentType<TModel>;

export abstract class ComponentViewManager<TModel extends Model> {
    protected container!: HTMLElement;
    protected model: TModel;
    protected dataSource: DataSource<any>;

    constructor(
        protected componentView: ComponentViewType<TModel>,
        protected component: JetComponent<TModel>
    ) {
        this.model = component.model;
        this.dataSource = component.dataSource;
    }

    public render(container: HTMLElement) {
        this.container = container;
    }
    public abstract update(): void;
}
