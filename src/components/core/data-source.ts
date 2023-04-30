import { isDefined } from "../../utils";
import { JetComponent } from "./jet-component";

export type DataSourceConfigType<TItem> = Array<TItem> | DataSourceConfig<TItem> | undefined;

export type ItemKey = number | string;

export type DataSourceConfig<TItem> = {
    keyExpr?: string;
    generateKey?: () => ItemKey;
    items?: Array<TItem>;
}

export type DataSourceUpdate<TItem> = {
    type: 'full' | 'add' | 'delete' | 'update';
    item?: TItem;
};

export class DataSource<TItem> {
    private component!: JetComponent;
    public setComponent(component: JetComponent) {
        this.component = component;
    }

    protected config: DataSourceConfig<TItem>;
    private itemByKey: { [name: ItemKey]: TItem } = {};

    constructor(config: DataSourceConfigType<TItem>) {
        this.config = this.prepareDataSourceConfig(config);

        this.processItems(this.config.items!);
    }

    private prepareDataSourceConfig(config: DataSourceConfigType<TItem>): DataSourceConfig<TItem> {
        if(!isDefined(config)) {
            return {};
        }

        if(config instanceof Array) {
            return { items: config };
        }

        return config!;
    }

    // ===

    private processItems(items: Array<TItem>) {
        this.itemByKey = {};

        for(const item of items) {
            this.processItem(item);
        }
    }
    private processItem(item: TItem) {
        const key = this.getItemKey(item);

        if(isDefined(this.itemByKey[key])) {
            throw new Error(`Item with key ${key} already exists`);
        }

        this.itemByKey[key] = item;
    }

    // ===

    protected normalizeItem(item: TItem | ItemKey): TItem {
        if(typeof item === 'string' || typeof item === 'number') {
            item = this.getItemByKey(item);
        }

        return item;
    }

    protected normalizeKey(item: TItem | ItemKey): ItemKey {
        if(typeof item !== 'string' && typeof item !== 'number') {
            item = this.getItemKey(item);
        }

        return item;
    }

    // ===
    private generateKey(): ItemKey {
        if(isDefined(this.config.generateKey)) {
            return this.config.generateKey!();
        }

        return "JetID_" + Date.now() + Math.random() * 1000;
    }

    private getKeyExpr(): string {
        return this.config.keyExpr || 'id';
    }

    public getItemKey(item: TItem): ItemKey {
        const keyExpr = this.getKeyExpr();

        return (item as any)[keyExpr];
    }

    public getItemByKey(key: ItemKey) {
        return this.itemByKey[key];
    }

    public getItems(): Array<TItem> {
        return Object.values(this.itemByKey);
    }

    public setItems(items: Array<TItem>) {
        this.processItems(items);

        this.component.dataUpdated({
            type: 'full',
        });
    }

    public addItem(item: TItem) {
        const keyExpr = this.getKeyExpr();
        const key = this.getItemKey(item) || this.generateKey();

        (item as any)[keyExpr] = key;

        this.processItem(item);

        this.component.dataUpdated({
            type: 'add', item,
        });
    }

    public deleteItem(item: TItem | ItemKey) {
        const key = this.normalizeKey(item);

        const deletedItem = this.itemByKey[key];
        delete this.itemByKey[key];

        this.component.dataUpdated({
            type: 'delete',
            item: deletedItem,
        });
    }

    public updateItem(key: ItemKey, item: TItem) {
        this.itemByKey[key] = item;

        this.component.dataUpdated({
            type: 'update', item,
        });
    }
}