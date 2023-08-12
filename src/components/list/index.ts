import { ListModel, ListOptions } from "./list.model";
import { View, JetComponent } from "core";
import { ListController } from "./list.controller";
import { ListInfernoView } from "./list.inferno.view";
import { ListDataSource, ListDataSourceConfig } from "./list.data-source";

class ListView extends View<ListModel> {
    initialize() {
        this.setView(ListInfernoView);
    }
}

export class List<TItem> extends JetComponent<ListModel> {
    constructor(
        container: HTMLElement,
        options: ListOptions,
        dataSourceConfig: ListDataSourceConfig<TItem> | Array<TItem> = []
    ) {
        const model = new ListModel(options);

        super("List", container, model, new ListDataSource(dataSourceConfig));
    }

    protected registerModules(): void {
        this.registerView(new ListView(this));
        this.registerController(new ListController(this));
    }
}