import { Component } from "./component";

export abstract class Module {
    constructor(public component: Component) {
        this.component = component;
    }

    public initialize() {};

    public getModelByName(name: string) {
        return this.component.getModel(name);
    }
    public getViewByName(name: string) {
        return this.component.getView(name);
    }
    public getControllerByName(name: string) {
        return this.component.getController(name);
    }

    public getModel(modelType: ModelContructor) {
        return this.component.getModel(modelType.name);
    }
    public getView(viewType: ViewContructor) {
        return this.component.getView(viewType.name);
    }
    public getController(controllerType: ControllerContructor) {
        return this.component.getController(controllerType.name);
    }
}

export abstract class View extends Module {

}

export abstract class Controller extends Module {

}

export abstract class Model extends Module {

}

export type ModuleContructor<T> = new(component: Component) => T
export type ModelContructor = ModuleContructor<Model>;
export type ViewContructor = ModuleContructor<View>;
export type ControllerContructor = ModuleContructor<Controller>;