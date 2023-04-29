import { Model } from "../model";
import { JetComponent } from "../jet-component";
import { createElement } from "inferno-create-element";
import { View } from "../view";
import { render } from "inferno";
import { InfernoComponent } from "./index";

export type InfernoProps<TModel extends Model> = {
    component: JetComponent<TModel>,
    model: TModel,
};

export type InfernoComponentType<TModel extends Model> = new(props: InfernoProps<TModel>) => InfernoComponent<InfernoProps<TModel>>;

export function renderInfernoComponent<TModel extends Model>(container: HTMLElement, view: View<TModel>) {
    const props = {
        component: view.component,
        model: view.model,
    };

    // @ts-ignore
    const element = createElement(view.componentView, props);

    render(element, container);
}