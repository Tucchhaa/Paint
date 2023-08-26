import { Model } from '../model';
import { JetComponent } from '../jet-component';
import { createElement } from 'inferno-create-element';
import { ComponentViewManager } from './manager';
import { render, VNode } from 'inferno';
import { Component as InfernoComponent, Fragment } from 'inferno';
import { DataSource } from '../data-source';

type InfernoProps<TModel extends Model, TDataSource extends DataSource = any> = {
    component: JetComponent<TModel>,

    model: TModel,

    dataSource: TDataSource
};

type InfernoComponentType<TModel extends Model> = new(props: InfernoProps<TModel>) => InfernoComponent<InfernoProps<TModel>>;

class InfernoViewManager<TModel extends Model> extends ComponentViewManager<TModel> {
    private element!: VNode;

    render(container: HTMLElement) {
        super.render(container);

        const props = {
            component: this.component,
            model: this.model,
            dataSource: this.dataSource,
        };

        // @ts-ignore
        this.element = createElement(this.componentView, props);

        render(this.element, this.container);
    }

    update() {
        (this.element.children as any).forceUpdate();
        // render(this.element, this.container);
    }

    public onDataChange(): void {
        (this.element.children as any).onDataChange?.();
    }
}

export {
    InfernoComponent,
    Fragment,

    InfernoViewManager,
    InfernoProps,
    InfernoComponentType,
};
