import { JetComponent, JetPublicComponent } from './jet-component';
import { Model, StateUpdate } from './model';
import { View } from './views/view';
import { Controller } from './controller';
import { DataSourceChange } from './data-source/types';
import { DataSource } from './data-source';

export abstract class Module<TModel extends Model = any, TDataSource extends DataSource = any> {
    public get model() {
        return this.component.model;
    }

    public get dataSource() {
        return this.component.dataSource;
    }

    constructor(public component: JetComponent<TModel, TDataSource>) { }
    
    // ===
    // Life cycle methods
    // ===

    public initialize() {}

    public onStateUpdate(update: StateUpdate) {}

    public onDataChange(update: DataSourceChange) {}

    // ===
    // Getters
    // ===

    public getView(id: string | ViewType) {
        return this.component.getView(id);
    }

    public getController(id: string | ControllerType) {
        return this.component.getController(id);
    }

    public getPublicComponent() {
        return this.component as JetPublicComponent;
    }
}

export type ViewType = new(component: JetComponent) => View;
export type ControllerType = new(component: JetComponent) => Controller;
