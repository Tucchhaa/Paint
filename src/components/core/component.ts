import { isDefined } from "../../helpers";
import { Module, ModuleContructor, Model, View, Controller, ModelContructor, ViewContructor, ControllerContructor } from "./module";

export class Component {
    public NAME: string;
    public container: HTMLElement;
    private models: { [name: string]: Model } = {};
    private views: { [name: string]: View } = {};
    private controllers: { [name: string]: Controller } = {};

    constructor(
        name: string,
        container?: HTMLElement | null,
        model?: ModelContructor | ModelContructor[],
        view?: ViewContructor | ViewContructor[],
        controller?: ControllerContructor | ControllerContructor[]
    ) {
        this.NAME = name;

        if(container === undefined || container === null)
            throw new Error('container is undefined');

        this.container = container;

        this.assingModule(this.models, model);
        this.assingModule(this.views, view);
        this.assingModule(this.controllers, controller);

        this.initializeModules();
    }

    private assingModule<T extends Module>(
        modules: { [name: string]: T },
        moduleContructors?: ModuleContructor<T> | ModuleContructor<T>[])
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
            ...Object.values(this.models),
            ...Object.values(this.views),
            ...Object.values(this.controllers)
        ];

        for(const module of modules) {
            module.initialize();
        }
    }

    public getModel(name: string) {
        const model = this.models[name];

        if(model === undefined)
            throw new Error('Invalid model name ' + name);

        return model;
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