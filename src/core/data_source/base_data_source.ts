import { isDefined } from 'utils/helpers';
import { Store } from './store';
import { DataSourceEvents, DataChange, ItemKey, DataSourceConfig, Optional } from './types';
import { isKey } from './utils';
import { ArrayStore } from './array_store';

export abstract class BaseDataSource<TItem = any, TKey extends keyof TItem = any> {
    // ===
    // Config
    // ===

    public readonly key: keyof TItem;

    private readonly store: Store<TItem>;

    // ===
    // Properties
    // ===
    public events = new DataSourceEvents<TItem>();

    public readonly generateKey: () => ItemKey;

    private defaultGenerateKey(): ItemKey {
        return 'JetID_' + Date.now() + Math.floor(Math.random() * 10000);
    }

    // ===
    // Initialization
    // ===

    constructor(config: DataSourceConfig<TItem>, dataSource?: BaseDataSource<TItem>) {
        this.key = config.key;
        this.generateKey = config.generateKey ?? this.defaultGenerateKey;

        this.store = isDefined(dataSource) ? dataSource.store : this.createStore(config);

        this.store.dataChange.on(this.dataChangeHandler.bind(this));
    }

    private createStore(config: DataSourceConfig<TItem>): Store<TItem> {
        const keyOf = this.keyOf.bind(this);

        if(ArrayStore.isArrayStoreConfig(config.store))
            return new ArrayStore<TItem>(keyOf, config.store);

        throw new Error('Store type can not be determined');
    }

    private dataChangeHandler(change: DataChange<TItem>): void {
        this.events.change.emit(change);

        switch(change.type) {
        case 'add':
            return this.events.add.emit(change);
        case 'delete':
            return this.events.delete.emit(change);
        case 'update':
            return this.events.update.emit(change);
        default:
            return;
        }

    }

    // ===
    // Public methods
    // ===

    public keyOf(item: TItem): ItemKey {
        return item[this.key] as ItemKey;
    }

    // ===
    // CRUD methods
    // ===

    public async getItem(key: ItemKey): Promise<TItem> {
        return await this.store.get(key);
    }

    public async getItems(): Promise<Array<TItem>> {
        return await this.store.getAll();
    }

    public async addItem(item: Optional<TItem, TKey>): Promise<void> {
        const key = this.keyOf(item as TItem) || this.generateKey();

        const preparedItem = {  ...item, [this.key]: key } as TItem; 

        await this.store.add(key, preparedItem);
    }

    public async deleteItem(item: TItem | ItemKey): Promise<TItem> {
        const key = isKey(item) ? item : this.keyOf(item);

        const deletedItem = await this.store.delete(key);

        return deletedItem;
    }

    public async updateItem(item: TItem): Promise<void> {
        const key = this.keyOf(item);

        if(!isDefined(key))
            throw new Error('updateItem key is undefined');

        await this.updateItemByKey(key, item);
    }

    public async updateItemByKey(key: ItemKey, item: TItem): Promise<void> {
        await this.store.update(key, item);
    }
}
