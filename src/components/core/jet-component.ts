import { isDefined } from "../../utils";
import { Model, StateUpdate } from "./model";
import { Module, ModuleType, ViewType, ControllerType } from "./module";
import { View } from './view';
import { Controller } from './controller';
import { DataSource, DataSourceChange } from "./data-source";

export class JetComponent<TModel extends Model = Model> {
    /**
     * Component name
     */
    public readonly name: string;

    /**
     * HTML element containing component
     */
    public readonly container: HTMLElement;

    /**
     * Model stores the state of the component
     */
    public readonly model: TModel;

    /**
     * Data storage
     */
    public dataSource!: DataSource;

    private readonly views: { [name: string]: View<TModel> } = {};

    private readonly controllers: { [name: string]: Controller<TModel> } = {};

    /**
     * All controllers and views, that will get notified on events
     */
    private readonly modules: Module<TModel>[];

    constructor(
        name: string,
        container: HTMLElement,
        model: TModel,
        view?: ViewType<TModel> | ViewType<TModel>[],
        controller?: ControllerType<TModel> | ControllerType<TModel>[],
        dataSource?: DataSource
    ) {
        this.name = name;
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
            this.setDataSource(dataSource);
        }
        this.initializeModel();
        this.initializeModules();

        // ===

        this.renderViews();
    }

    protected setDataSource(dataSource: DataSource) {
        this.dataSource = dataSource;

        const changeHandler = (update: DataSourceChange) => {
            for(const module of this.modules) {
                module.dataUpdate(update);
            }
        }

        this.dataSource.events.change.on(changeHandler);
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