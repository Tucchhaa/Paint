import { isDefined } from "../../utils";
import { Model, StateUpdate } from "./model";
import { Module, ModuleType, ViewType, ControllerType } from "./module";
import { View } from './view';
import { Controller } from './controller';
import { DataSource, DataSourceUpdate } from "./data-source";

export class JetComponent<TModel extends Model = Model, TItem = any> {
    public readonly name: string;
    public readonly container: HTMLElement;
    public readonly model: TModel;
    public readonly dataSource!: DataSource<TItem>;
    private readonly views: { [name: string]: View<TModel> } = {};
    private readonly controllers: { [name: string]: Controller<TModel> } = {};
    private readonly modules: Module<TModel>[];

    constructor(
        name: string,
        container: HTMLElement | null,
        model: TModel,
        view?: ViewType<TModel> | ViewType<TModel>[],
        controller?: ControllerType<TModel> | ControllerType<TModel>[],
        dataSource?: DataSource<TItem>
    ) {
        this.name = name;

        if(container === undefined || container === null)
            throw new Error('container is undefined');

        this.container = container;

        // ===

        this.model = model;
        this.registerModule(this.views, view);
        this.registerModule(this.controllers, controller);

        this.modules = [
            ...Object.values(this.views),
            ...Object.values(this.controllers),
        ];

        // ===

        if(isDefined(dataSource)) {
            this.dataSource = dataSource!;
            this.initializeDataSource();
        }
        this.initializeModel();
        this.initializeModules();

        // ===

        this.renderViews();
    }

    private registerModule<T extends Module<TModel>>(
        modules: { [name: string]: T },
        moduleConstructors?: ModuleType<TModel, T> | ModuleType<TModel, T>[])
    {
        if(moduleConstructors !== undefined) {
            moduleConstructors = Array.isArray(moduleConstructors) ? moduleConstructors : [moduleConstructors];

            moduleConstructors.forEach(constructor => {
                const module = new constructor(this);

                if(isDefined(modules[constructor.name])) {
                    throw new Error(`Module with name ${constructor.name} is already defined.`);
                }

                modules[constructor.name] = module;
            });
        }
    }

    private initializeDataSource() {
        this.dataSource!.setComponent((this as unknown) as JetComponent);
    }

    private initializeModel() {
        this.model.setComponent((this as unknown) as JetComponent);
    }

    private initializeModules() {
        for(const module of this.modules) {
            module.initialize();
        }
    }

    private renderViews() {
        this.container.innerHTML = "";

        for(const view of Object.values(this.views)) {
            view.render(this.container);
        }
    }

    public stateUpdated(update: StateUpdate) {
        for(const module of this.modules) {
            module.stateUpdated(update);
        }
    }

    public dataUpdated(update: DataSourceUpdate<any>) {
        for(const module of this.modules) {
            module.dataUpdate(update);
        }
    }

    public getView(id: string | ViewType<TModel>) {
        id = typeof id === 'string' ? id : id.name;

        const view = this.views[id];

        if(view === undefined)
            throw new Error('Invalid view name ' + id);

        return view;
    }

    public getController(id: string | ControllerType<TModel>) {
        id = typeof id === 'string' ? id : id.name;

        const controller = this.controllers[id];

        if(controller === undefined)
            throw new Error('Invalid controller name ' + id);

        return controller;
    }
}