import { JetComponent, JetPublicComponent } from './jet_component';
import { Model, StateUpdate } from './model';
import { View } from './views/view';
import { Controller } from './controller';
import { DataSourceChange } from './data_source';

export abstract class Module<TModel extends Model = any> {
    public get model() {
        return this.component.model;
    }

    public get dataSource() {
        return this.component.dataSource;
    }

    constructor(public component: JetComponent<TModel>) { }
    
    // ===
    // Life cycle methods
    // ===

    /**
     * It is the best place to get dependencies (controllers and views)
     */
    public initialize() {}

    public onStateUpdate(update: StateUpdate) {}

    public onDataChange(update: DataSourceChange) {}

    // ===
    // Getters
    // ===

    public getView<T extends View<TModel>>(id: string | (new(...args: any[]) => T)): T {
        return this.component.getView(id);
    }

    public getController<T extends Controller<TModel>>(id: string | (new(...args: any[]) => T)): T {
        return this.component.getController(id);
    }

    public getPublicComponent(): JetPublicComponent {
        return this.component as JetPublicComponent;
    }
}

export type ViewType = new(component: JetComponent) => View;
export type ControllerType = new(component: JetComponent) => Controller;
