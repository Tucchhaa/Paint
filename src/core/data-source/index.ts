import { isDefined } from 'utils/helpers';
import { Store } from './store';
import { DataSourceFields, DataSourceEvents, DataSourceChange, ItemKey, DataSourceConfig } from './types';
import { isKey } from './utils';
import { ArrayStore } from './array-store';

export class DataSource<TItem = any> implements DataSourceFields<TItem> {
    // ===
    // Config
    // ===

    public readonly keyExpr: string;

    private readonly store: Store<TItem>;

    // ===
    // Properties
    // ===
    public events = new DataSourceEvents<DataSourceChange<TItem>>();

    private customGenerateKey?: () => ItemKey;

    // ===
    // Initialization
    // ===

    constructor(config: DataSourceConfig<TItem>) {        
        this.keyExpr = config.keyExpr;
        this.customGenerateKey = config.generateKey;

        this.store = this.createStore(config);

        this.events.change.on(this.changeHandler.bind(this));
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

    private createStore(config: DataSourceConfig<TItem>): Store<TItem> {
        const keyOf = this.keyOf.bind(this);

        if(ArrayStore.isArrayStoreConfig(config.store))
            return new ArrayStore<TItem>(keyOf, config.store);

        throw new Error('Store type can not be determined');
    }

    // ===
    // Public methods
    // ===

    public generateKey(): ItemKey {
        return isDefined(this.customGenerateKey)
            ? this.customGenerateKey()
            // TODO use GUID
            : 'JetID_' + Date.now() + Math.random() * 1000;;
    }

    public keyOf(item: TItem): ItemKey {
        return (item as any)[this.keyExpr];
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

    public async addItem(item: TItem): Promise<void> {
        const key = this.keyOf(item) || this.generateKey();

        (item as any)[this.keyExpr] = key;

        await this.store.add(key, item);

        this.events.change.emit({
            type: 'add', item,
        });
    }

    public async deleteItem(item: TItem | ItemKey): Promise<TItem> {
        const key = isKey(item) ? item : this.keyOf(item);

        const deletedItem = await this.store.delete(key);

        this.events.change.emit({
            type: 'delete',
            item: deletedItem,
        });

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
        
        this.events.change.emit({
            type: 'update', item,
        });
    }
}
