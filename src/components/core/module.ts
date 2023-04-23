import { JetComponent } from "./jet-component";
import { Model } from "./model";
import { View } from './view';
import { Controller } from './controller';

export abstract class Module<TModel extends Model> {
    constructor(public component: JetComponent<TModel>) {
        this.component = component;
    }

    public initialize() {};

    public get model() {
        return this.component.model as TModel;
    }
    public getView(id: string | ViewType<TModel>) {
        return this.component.getView(id);
    }
    public getController(id: string | ControllerType<TModel>) {
        return this.component.getController(id);
    }
}

export type ModuleType<TModel extends Model, T> = new(component: JetComponent<TModel>) => T

export type ViewType<TModel extends Model> = ModuleType<TModel, View<TModel>>;
export type ControllerType<TModel extends Model> = ModuleType<TModel, Controller<TModel>>;