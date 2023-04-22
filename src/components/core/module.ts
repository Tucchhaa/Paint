import { JetComponent } from "./jet-component";
import { Model } from "./model";
import { View } from './view';
import { Controller } from './controller';

export abstract class Module<TModel extends Model> {
    constructor(public component: JetComponent<TModel>) {
        this.component = component;
    }

    public initialize() {};

    public getViewByName(name: string) {
        return this.component.getView(name);
    }
    public getControllerByName(name: string) {
        return this.component.getController(name);
    }

    public get model() {
        return this.component.model as TModel;
    }
    public getView(viewType: ViewContructor<TModel>) {
        return this.component.getView(viewType.name);
    }
    public getController(controllerType: ControllerContructor<TModel>) {
        return this.component.getController(controllerType.name);
    }
}

export type ModuleContructor<TModel extends Model, T> = new(component: JetComponent<TModel>) => T

export type ViewContructor<TModel extends Model> = ModuleContructor<TModel, View<TModel>>;
export type ControllerContructor<TModel extends Model> = ModuleContructor<TModel, Controller<TModel>>;