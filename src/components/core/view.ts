import { Model } from "./model";
import { Module } from "./module";

import { InfernoComponent, InfernoComponentType, renderInfernoComponent } from "./inferno";
import { isDefined } from "../../utils";

type ViewType<TModel extends Model> = InfernoComponentType<TModel>;

export abstract class View<TModel extends Model> extends Module<TModel> {
    public componentView?: ViewType<TModel>;

    protected setView(view: ViewType<TModel>) {
        this.componentView = view;
    }

    public render(container: HTMLElement) {
        if(!isDefined(this.componentView)) {
            throw new Error('View.componentView is undefined. Use setView in initialize() to define it');
        }

        if(this.componentView!.prototype instanceof InfernoComponent) {
            renderInfernoComponent(container, this);
        }
    }
}
