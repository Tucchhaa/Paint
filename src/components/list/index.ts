import { ListModel, ListOptions } from "./list.model";
import { View, JetComponent } from "../core";
import { ListController } from "./list.controller";
import { ListInfernoView } from "./list.inferno.view";
import { ListDataSource, ListDataSourceConfig } from "./list.data-source";

class ListView extends View<ListModel> {
    initialize() {
        this.setView(ListInfernoView);
    }
}

export class List<TItem> extends JetComponent<ListModel, TItem> {
    constructor(
        container: HTMLElement | null,
        options?: ListOptions,
        dataSourceConfig?: ListDataSourceConfig<TItem> | Array<TItem>
    ) {
        const model = new ListModel(options);
        const dataSource = new ListDataSource(dataSourceConfig);

        super("List", container, model, ListView, ListController, dataSource);
    }
}