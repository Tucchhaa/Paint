import { ListModel, ListOptions } from "./list.model";
import { View, JetComponent } from "../core";
import { ListController } from "./list.controller";
import { ListInfernoView } from "./list.inferno.view";

class ListView extends View<ListModel> {
    initialize() {
        this.setView(ListInfernoView);
    }
}

export class List extends JetComponent<ListModel> {
    constructor(container: HTMLElement | null, options?: ListOptions) {
        const model = new ListModel(options);

        super("List", container, model, ListView, ListController);
    }
}