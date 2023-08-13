import { DataSource } from "core/data-source";
import { DataSourceConfig } from "core/data-source/types";
import { isDefined } from "utils/helpers";

export type ListDataSourceConfig<TItem> = DataSourceConfig<TItem> & {
    isSelected?: (item: TItem) => boolean;

    text?: (item: TItem) => string;
}
export class ListDataSource<TItem> extends DataSource<TItem> {
    private isSelected?: (item: TItem) => boolean;

    private text?: (item: TItem) => string;

    constructor(config: ListDataSourceConfig<TItem>) {
        super(config);

        this.isSelected = config.isSelected;
        this.text = config.text;
    }

    public isItemSelected(item: TItem) {
        return isDefined(this.isSelected) 
            ? this.isSelected(item) 
            : (item as any).selected;
    }

    public getItemText(item: TItem) {
        return isDefined(this.text) 
            ? this.text(item) 
            : (item as any).text;
    }
}