import { isDefined } from 'utils/helpers';
import { Model, StateUpdate } from './model';
import { Module } from './module';
import { View } from './views/view';
import { Controller } from './controller';
import { DataSource, DataSourceChange } from './data_source';

export type JetPublicComponent<
    TModel extends Model = Model,
> = Omit<JetComponent<TModel>, 'getController' | 'getView'>; 

export abstract class JetComponent<TModel extends Model = any> {
    /**
     * Component name
     */
    public static readonly componentName: string = 'Jet';

    /**
     * HTML element containing component
     */
    public container!: HTMLElement;

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

    constructor(model: TModel, dataSource?: DataSource) {
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
    }

    // ===
    // Initialization
    // ===

    protected abstract registerModules(): void;

    private setModel(model: TModel) {
        this.model = model;

        this.model.events.update.on(this.stateUpdateHandler.bind(this));
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
     * Rendering and state update
     */
    public static render(container: HTMLElement): JetComponent {
        /* Each component should implement this static method */
        throw new Error('Not implemented');
    }

    public render(container: HTMLElement) {
        this.container = container;
        this.container.innerHTML = '';

        for(const view of Object.values(this.views)) {
            view.render(container);
        }

        return this;
    }

    private stateUpdateHandler(update: StateUpdate) {
        for(const module of this.modules) {
            module.onStateUpdate(update);
        }
    }

    private dataChangeHandler(change: DataSourceChange) {
        for(const module of this.modules)
            module.onDataChange(change);
    }

    // ===
    // Getters
    // ===

    public getView<T extends View<TModel>>(id: string | (new(...args: any[]) => T)): T {
        id = typeof id === 'string' ? id : id.name;

        const view: View<TModel> | undefined = this.views[id];

        if(isDefined(view))
            return view as T;

        throw new Error('Invalid view name ' + id);
    }

    public getController<T extends Controller<TModel>>(id: string | (new(...args: any[]) => T)): T {
        id = typeof id === 'string' ? id : id.name;

        const controller: Controller<TModel> | undefined = this.controllers[id];

        if(isDefined(controller))
            return controller as T;

        throw new Error('Invalid controller name ' + id);
    }
}
