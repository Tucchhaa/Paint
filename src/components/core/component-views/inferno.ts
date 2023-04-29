import { Model } from "../model";
import { JetComponent } from "../jet-component";
import { createElement } from "inferno-create-element";
import { ComponentViewManager } from './manager';
import { render, VNode } from "inferno";
import { Component as InfernoComponent } from "inferno";

type InfernoProps<TModel extends Model> = {
    component: JetComponent<TModel>,
    model: TModel,
};

type InfernoComponentType<TModel extends Model> = new(props: InfernoProps<TModel>) => InfernoComponent<InfernoProps<TModel>>;

class InfernoViewManager<TModel extends Model> extends ComponentViewManager<TModel> {
    private element!: VNode;

    render(container: HTMLElement) {
        super.render(container);

        const props = {
            component: this.component,
            model: this.model,
        };

        // @ts-ignore
        this.element = createElement(this.componentView, props);

        render(this.element, this.container);
    }

    update() {
        render(this.element, this.container);
    }
}

export {
    InfernoComponent,

    InfernoViewManager,
    InfernoProps,
    InfernoComponentType,
};
//
// export function renderInfernoComponent<TModel extends Model>(container: HTMLElement, view: View<TModel>) {
//     const props = {
//         component: view.component,
//         model: view.model,
//     };
//
//     // @ts-ignore
//     const element = createElement(view.componentView, props);
//
//     render(element, container);
//
//     setTimeout(() => {
//         (view.model as any).text = 'gavno';
//         element.props.model = view.model;
//         render(element, container);
//     }, 5000);
// }
//
