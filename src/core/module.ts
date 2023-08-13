import { JetComponent, JetPublicComponent } from "./jet-component";
import { Model, StateUpdate } from "./model";
import { View } from './views/view';
import { Controller } from './controller';
import { DataSourceChange } from "./data-source/types";

export abstract class Module<TModel extends Model> {
    public get model() {
        return this.component.model as TModel;
    }

    constructor(public component: JetComponent<TModel>) {
        this.component = component;
    }
    
    // ===
    // Life cycle methods
    // ===

    public initialize() {}

    public onStateUpdate(update: StateUpdate) {}

    public onDataChange(update: DataSourceChange<any>) {}

    // ===
    // Getters
    // ===

    public getView(id: string | ViewType<TModel>) {
        return this.component.getView(id);
    }

    public getController(id: string | ControllerType<TModel>) {
        return this.component.getController(id);
    }

    public getPublicComponent() {
        return this.component as JetPublicComponent;
    }
}

type ModuleType<TModel extends Model, T> = new(component: JetComponent<TModel>) => T;

export type ViewType<TModel extends Model> = ModuleType<TModel, View<TModel>>;
export type ControllerType<TModel extends Model> = ModuleType<TModel, Controller<TModel>>;
