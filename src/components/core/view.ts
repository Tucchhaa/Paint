import { Model } from "./model";
import { Module } from "./module";

import { createElement } from "inferno-create-element";
import { Component as InfernoComponent, render } from "inferno";

export abstract class View<TModel extends Model> extends Module<TModel> {
    public abstract render(container: HTMLElement): void;
}

export abstract class InfernoView<TModel extends Model> extends View<TModel> {
    protected view!: InfernoComponent;

    public render(container: HTMLElement) {
        // @ts-ignore
        render(createElement(this.view), container);
    }
}