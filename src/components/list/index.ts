import { ListModel, ListState } from './list.model';
import { View, JetComponent } from 'core';
import { ListController } from './list.controller';
import { ListInfernoView } from './list.inferno';
import { ListDataSource } from './list.data-source';

class ListView extends View<ListModel> {
    initialize() {
        this.setView(ListInfernoView);
    }
}

export class List<TItem = any, TKey extends keyof TItem = any> extends JetComponent<ListModel, ListDataSource<TItem, TKey>> {
    constructor(
        container: HTMLElement,
        state: ListState,
        dataSource: ListDataSource<TItem, TKey>
    ) {
        const model = new ListModel(state);

        super('List', container, model, dataSource);
    }

    protected registerModules(): void {
        this.registerView(new ListView(this));
        this.registerController(new ListController(this));
    }
}