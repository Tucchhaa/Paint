import { isDefined } from "../../helpers";
import { Model } from "./model";
import { Module, ModuleContructor, View, Controller, ViewContructor, ControllerContructor } from "./module";

export class Component<TModel extends Model> {
    public NAME: string;
    public container: HTMLElement;
    public model: Model;
    private views: { [name: string]: View<TModel> } = {};
    private controllers: { [name: string]: Controller<TModel> } = {};

    constructor(
        name: string,
        container: HTMLElement | null,
        model: Model,
        view?: ViewContructor<TModel> | ViewContructor<TModel>[],
        controller?: ControllerContructor<TModel> | ControllerContructor<TModel>[]
    ) {
        this.NAME = name;

        if(container === undefined || container === null)
            throw new Error('container is undefined');

        this.container = container;

        this.model = model;
        this.assingModule(this.views, view);
        this.assingModule(this.controllers, controller);

        this.initializeModules();
    }

    private assingModule<T extends Module<TModel>>(
        modules: { [name: string]: T },
        moduleContructors?: ModuleContructor<TModel, T> | ModuleContructor<TModel, T>[])
    {
        if(moduleContructors !== undefined) {
            moduleContructors = Array.isArray(moduleContructors) ? moduleContructors : [moduleContructors];

            moduleContructors.forEach(contructor => {
                const module = new contructor(this);

                if(isDefined(modules[contructor.name])) {
                    throw new Error(`Module with name ${contructor.name} is already defined.`);
                }

                modules[contructor.name] = module;
            });
        }
    }

    private initializeModules() {
        const modules = [
            ...Object.values(this.views),
            ...Object.values(this.controllers)
        ];

        for(const module of modules) {
            module.initialize();
        }
    }

    public getView(name: string) {
        const view = this.views[name];

        if(view === undefined)
            throw new Error('Invalid view name ' + name);

        return view;
    }
    public getController(name: string) {
        const controller = this.controllers[name];

        if(controller === undefined)
            throw new Error('Invalid controller name ' + name);

        return controller;
    }
}