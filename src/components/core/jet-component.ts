import { isDefined } from "../../utils";
import { Model, StateChange } from "./model";
import { Module, ModuleType, ViewType, ControllerType } from "./module";
import { View } from './view';
import { Controller } from './controller';

export class JetComponent<TModel extends Model = Model> {
    public name: string;
    public container: HTMLElement;
    public model: TModel;
    private views: { [name: string]: View<TModel> } = {};
    private controllers: { [name: string]: Controller<TModel> } = {};
    private modules: Module<TModel>[];

    constructor(
        name: string,
        container: HTMLElement | null,
        model: TModel,
        view?: ViewType<TModel> | ViewType<TModel>[],
        controller?: ControllerType<TModel> | ControllerType<TModel>[]
    ) {
        this.name = name;

        if(container === undefined || container === null)
            throw new Error('container is undefined');

        this.container = container;

        this.model = model;
        this.registerModule(this.views, view);
        this.registerModule(this.controllers, controller);

        this.modules = [
            ...Object.values(this.views),
            ...Object.values(this.controllers),
        ];

        this.initializeModel();
        this.initializeModules();
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

    private initializeModel() {
        this.model.initialize((this as unknown) as JetComponent);
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

    public stateChanged(change: StateChange) {
        for(const module of this.modules) {
            module.update(change);
        }
    };

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