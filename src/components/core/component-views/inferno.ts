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
        (this.element.children as any).forceUpdate();
        // render(this.element, this.container);
    }
}

export {
    InfernoComponent,

    InfernoViewManager,
    InfernoProps,
    InfernoComponentType,
};
