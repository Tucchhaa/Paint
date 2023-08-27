import { Model } from '../model';
import { Module } from '../module';

import { InfernoComponent, InfernoViewManager } from './inferno';
import { isDefined } from 'utils/helpers';

import { ComponentViewManager, ComponentViewType } from './manager';

export abstract class View<TModel extends Model = any> extends Module<TModel> {
    private componentViewManager!: ComponentViewManager;

    protected setView(view: ComponentViewType) {
        if(view.prototype instanceof InfernoComponent) {
            this.componentViewManager = new InfernoViewManager(view, this.component);
        }
    }

    public render(container: HTMLElement) {
        if(!isDefined(this.componentViewManager)) {
            throw new Error('View.componentView is undefined. Use setView in initialize() to define it');
        }

        this.componentViewManager.render(container);
    }

    public onStateUpdate() {
        this.componentViewManager.onStateUpdate();
    }

    public onDataChange() {
        this.componentViewManager.onDataChange();
    }
}
