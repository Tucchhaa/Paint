import { ListModel, ListState } from "./list.model";
import { View, JetComponent } from "core";
import { ListController } from "./list.controller";
import { ListInfernoView } from "./list.inferno.view";
import { ListDataSource } from "./list.data-source";

class ListView extends View<ListModel> {
    initialize() {
        this.setView(ListInfernoView);
    }
}

export class List<TItem> extends JetComponent<ListModel> {
    constructor(
        container: HTMLElement,
        state: ListState,
        dataSource: ListDataSource<TItem>
    ) {
        const model = new ListModel(state);

        super("List", container, model, dataSource);
    }

    protected registerModules(): void {
        this.registerView(new ListView(this));
        this.registerController(new ListController(this));
    }
}