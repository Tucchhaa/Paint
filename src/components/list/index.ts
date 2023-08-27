import { ListModel, ListState } from './list.model';
import { View, JetComponent } from 'core';
import { ListController } from './list.controller';
import { ListInfernoView } from './list.inferno';
import { ListDataController } from './list.data_controller';
import { DataSource } from 'core/data_source';

class ListView extends View<ListModel> {
    initialize() {
        this.setView(ListInfernoView);
    }
}

export class List extends JetComponent<ListModel> {
    constructor(
        container: HTMLElement,
        state: ListState,
        dataSource: DataSource
    ) {
        const model = new ListModel(state);

        super('List', container, model, dataSource);
    }

    protected registerModules(): void {
        this.registerView(new ListView(this));

        this.registerController(new ListController(this));
        this.registerController(new ListDataController(this));
    }
}