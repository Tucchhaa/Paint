import { isDefined } from 'utils/helpers';
import { Store } from './store';
import { ItemKey } from './types';

export type ArrayStoreConfig<TItem> = {
    items: Array<TItem>
};

export class ArrayStore<TItem = any> extends Store<TItem> {
    static isArrayStoreConfig(config: any) {
        return isDefined(config.items);
    }

    /**
     * Items by their keys
     */
    private itemByKey: Record<ItemKey, TItem> = {};
    
    /**
     * Return key of item
     */
    private keyOf: (item: TItem) => ItemKey;

    // ===
    // Initialization
    // ===

    constructor(keyOf: (item: TItem) => ItemKey, config: ArrayStoreConfig<TItem>) {
        super();

        this.keyOf = keyOf;

        this.setItems(config.items);
    }

    // ===
    // CRUD methods
    // ===

    public setItems(items: Array<TItem>): void {
        this.itemByKey = {};

        for(const item of items) {
            const key = this.keyOf(item);

            if(isDefined(this.itemByKey[key])) {
                throw new Error(`Item with key ${key} already exists`);
            }
    
            this.itemByKey[key] = item;
        }
    }

    public get(key: ItemKey): Promise<TItem> {
        return Promise.resolve(this.itemByKey[key]);
    }

    public getAll(): Promise<Array<TItem>> {
        return Promise.resolve(Object.values(this.itemByKey));
    }

    public add(key: ItemKey, item: TItem): Promise<void> {
        if(isDefined(this.itemByKey[key])) {
            throw new Error(`Item with key ${key} already exists`);
        }

        this.itemByKey[key] = item;

        this.dataChange.emit({ type: 'add', item });

        return Promise.resolve();
    }

    public delete(key: ItemKey): Promise<TItem> {
        const deletedItem = this.itemByKey[key];
        delete this.itemByKey[key];

        this.dataChange.emit({ type: 'delete', item: deletedItem });

        return Promise.resolve(deletedItem);
    }

    public update(key: ItemKey, item: TItem): Promise<void> {
        this.itemByKey[key] = item;

        this.dataChange.emit({ type: 'update', item });

        return Promise.resolve();
    }
}