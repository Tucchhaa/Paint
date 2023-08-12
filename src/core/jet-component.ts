import { isDefined } from "utils/helpers";
import { Model, StateUpdate } from "./model";
import { Module, ViewType, ControllerType } from "./module";
import { View } from './views/view';
import { Controller } from './controller';
import { DataSource, DataSourceChange } from "./data-source";

export abstract class JetComponent<TModel extends Model = Model> {
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
    public model!: TModel;

    /**
     * Data storage
     */
    public dataSource!: DataSource;

    /**
     * Component's views
     */
    private readonly views: Record<string, View<TModel>> = {};

    /**
     * Component's controllers
     */
    private readonly controllers: Record<string, Controller<TModel>> = {};

    /**
     * All controllers and views, that will get notified on events
     */
    private readonly modules: Module<TModel>[];

    constructor(
        name: string,
        container: HTMLElement,
        model: TModel,
        dataSource?: DataSource
    ) {
        // === Base fields
        this.name = name;
        this.container = container;

        // === Register modules
        if(isDefined(dataSource)) {
            this.setDataSource(dataSource);
        }

        this.setModel(model);

        this.registerModules();

        // === Initialize modules
        this.modules = [
            ...Object.values(this.views), 
            ...Object.values(this.controllers),
        ];

        this.initializeModules();

        // === Render
        this.renderViews();
    }

    // ===
    // Initialization
    // ===

    protected abstract registerModules(): void;

    private setModel(model: TModel) {
        this.model = model;

        this.model.events.update.on(this.stateUpdatedHandler.bind(this));
    }

    private setDataSource(dataSource: DataSource) {
        this.dataSource = dataSource;

        this.dataSource.events.change.on(this.dataChangeHandler.bind(this));
    }

    protected registerController(controller: Controller<TModel>) {
        const name = (controller as object).constructor.name;

        if(isDefined(this.controllers[name]))
            throw new Error(`Controller with name ${name} is already defined.`);

        this.controllers[name] = controller;
    }

    protected registerView(view: View<TModel>) {
        const name = (view as object).constructor.name;

        if(isDefined(this.views[name]))
            throw new Error(`View with name ${name} is already defined.`);

        this.views[name] = view;
    }

    private initializeModules() {
        for(const module of this.modules) {
            module.initialize();
        }
    }

    // ===
    // Life cycle methods
    // ===

    /**
     * Renders all views
     */
    private renderViews() {
        this.container.innerHTML = "";

        for(const view of Object.values(this.views)) {
            view.render(this.container);
        }
    }

    public stateUpdatedHandler(update: StateUpdate) {
        for(const module of this.modules) {
            module.onStateUpdate(update);
        }
    }

    private dataChangeHandler(change: DataSourceChange) {
        for(const module of this.modules)
            module.onDataChange(change);
    };

    // ===
    // Getters
    // ===

    public getView(id: string | ViewType<TModel>): View<TModel> {
        id = typeof id === 'string' ? id : id.name;

        const view: View<TModel> | undefined = this.views[id];

        if(isDefined(view))
            return view;

        throw new Error('Invalid view name ' + id);
    }

    public getController(id: string | ControllerType<TModel>): Controller<TModel> {
        id = typeof id === 'string' ? id : id.name;

        const controller = this.controllers[id];

        if(isDefined(controller))
            return controller;

        throw new Error('Invalid controller name ' + id);
    }
}
