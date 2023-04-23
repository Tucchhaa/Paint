import { Model } from "./model";
import { Module } from "./module";

import { createElement } from "inferno-create-element";
import { Component as InfernoComponent, render} from "inferno";
import { JetComponent } from "./jet-component";

export abstract class View<TModel extends Model> extends Module<TModel> {
    public abstract render(container: HTMLElement): void;
}

export type InfernoProps<TModel extends Model> = {
    component: JetComponent<TModel>,
    model: TModel,
};

type InfernoComponentType<TModel extends Model> = new(props: InfernoProps<TModel>) => InfernoComponent<InfernoProps<TModel>>;

export abstract class InfernoView<TModel extends Model> extends View<TModel> {
    private result: any;

    protected setView(view: InfernoComponentType<TModel>) {
        const props = { component: this.component, model: this.model };

        // @ts-ignore
        this.result = createElement(view, props);
    }

    public render(container: HTMLElement) {
        render(this.result, container);
    }
}