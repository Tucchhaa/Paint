import { isDefined } from "utils/helpers";
import { JetEvent } from "../event";

export type DataSourceConfigType<TItem> = Array<TItem> | DataSourceConfig<TItem> | undefined;

export type ItemKey = number | string;

export type DataSourceConfig<TItem> = {
    keyExpr?: string;
    generateKey?: () => ItemKey;
    items?: Array<TItem>;
}

export type DataSourceChange<TItem = any> = {
    type: 'full' | 'add' | 'delete' | 'update';
    item?: TItem;
};

class DataSourceEvents<TArgs> {
    public change = new JetEvent<TArgs>();

    public add = new JetEvent<TArgs>();

    public delete = new JetEvent<TArgs>();

    public update = new JetEvent<TArgs>();

    public full = new JetEvent<TArgs>();
}

export class DataSource<TItem = any> {
    public events = new DataSourceEvents<DataSourceChange<TItem>>();

    protected config: DataSourceConfig<TItem>;
    private itemByKey: { [name: ItemKey]: TItem } = {};

    constructor(config: DataSourceConfigType<TItem>) {
        this.config = this.prepareDataSourceConfig(config);
        console.log(config, this.config);
        this.processItems(this.config.items!);

        this.events.change.on(this.changeHandler.bind(this));
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

    private changeHandler(change: DataSourceChange<TItem>): void {
        switch(change.type) {
        case 'add':
            return this.events.add.emit(change);
        case 'delete':
            return this.events.delete.emit(change);
        case 'update':
            return this.events.update.emit(change);
        case 'full':
            return this.events.full.emit(change);
        default:
            return;
        }
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

        this.events.change.emit({
            type: 'full',
        });
    }

    public addItem(item: TItem) {
        const keyExpr = this.getKeyExpr();
        const key = this.getItemKey(item) || this.generateKey();

        (item as any)[keyExpr] = key;

        this.processItem(item);

        this.events.change.emit({
            type: 'add', item,
        });
    }

    public deleteItem(item: TItem | ItemKey) {
        const key = this.normalizeKey(item);

        const deletedItem = this.itemByKey[key];
        delete this.itemByKey[key];

        this.events.change.emit({
            type: 'delete',
            item: deletedItem,
        });
    }

    public updateItem(key: ItemKey, item: TItem) {
        this.itemByKey[key] = item;
        
        this.events.change.emit({
            type: 'update', item,
        });
    }
}