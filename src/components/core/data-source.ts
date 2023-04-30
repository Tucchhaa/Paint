import { isDefined } from "../../utils";

export type DataSourceConfigType<TItem> = Array<TItem> | DataSourceConfig<TItem> | undefined;

export type ItemID = number | string;

export type DataSourceConfig<TItem> = {
    itemKey?: (item: TItem) => ItemID;
    items?: () => Array<TItem>;
}

export class DataSource<TItem> {
    protected config: DataSourceConfig<TItem>;
    private itemByKey: { [name: ItemID]: TItem } = {};

    constructor(config: DataSourceConfigType<TItem>) {
        this.config = this.prepareDataSourceConfig(config);

        this.processItems();
    }

    private prepareDataSourceConfig(config: DataSourceConfigType<TItem>): DataSourceConfig<TItem> {
        if(!isDefined(config)) {
            return {};
        }

        if(config instanceof Array) {
            return { items: () => config };
        }

        return config!;
    }

    private processItems() {
        for(const item of this.items()) {
            const key = this.itemKey(item);

            if(isDefined(this.itemByKey[key])) {
                throw new Error(`Item with key ${key} already exists`);
            }

            this.itemByKey[key] = item;
        }
    }

    public itemKey(item: TItem): ItemID {
        return isDefined(this.config.itemKey) ?
            this.config.itemKey!(item) :
            (item as any).id;
    }

    public item(key: ItemID) {
        return this.itemByKey[key];
    }

    public items(): Array<TItem> {
        return isDefined(this.config.items) ?
            this.config.items!() : [];
    }
}