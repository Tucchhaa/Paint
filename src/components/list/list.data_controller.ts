import { Controller } from 'core';
import { ListModel } from './list.model';
import { isDefined } from 'utils/helpers';

export type ListDataSourceConfig<TItem = any> = {
    isSelected?: (item: TItem) => boolean;

    text?: (item: TItem) => string;
}

export class ListDataController extends Controller<ListModel>  {
    private get config() {
        return this.dataSource.getConfig<ListDataSourceConfig>();
    }

    public async getItems() {
        return await this.dataSource.getItems();
    }

    public isItemSelected(item: any) {
        return isDefined(this.config.isSelected) 
            ? this.config.isSelected(item) : item.selected;
    }

    public getItemText(item: any) {
        return isDefined(this.config.text) 
            ? this.config.text(item) : item.text;
    }
}
