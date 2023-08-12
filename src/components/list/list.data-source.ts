import { DataSource, DataSourceConfig } from "core/data-source";
import { isDefined } from "utils/helpers";

export type ListDataSourceConfig<TItem> = DataSourceConfig<TItem> & {
    isSelected?: (item: TItem) => boolean;
    text?: (item: TItem) => string;
}
export class ListDataSource<TItem> extends DataSource<TItem> {
    constructor(config?: ListDataSourceConfig<TItem> | Array<TItem>) {
        super(config);
    }

    public isItemSelected(item: TItem) {
        const config = this.config as ListDataSourceConfig<TItem>;

        return isDefined(config.isSelected) ?
            config.isSelected!(item) : (item as any).selected;
    }

    public getItemText(item: TItem) {
        const config = this.config as ListDataSourceConfig<TItem>;

        return isDefined(config.text) ?
            config.text!(item) : (item as any).text;
    }
}