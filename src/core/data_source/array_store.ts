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
    private itemIdByKey: Record<ItemKey, number> = {};

    private items: TItem[] = [];
    
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
        this.itemIdByKey = {};
        this.items = [];

        for(let index=0; index < items.length; index++) {
            const item = items[index];
            const key = this.keyOf(item);

            if(isDefined(this.itemIdByKey[key])) {
                throw new Error(`Item with key ${key} already exists`);
            }
    
            this.items.push(item);
            this.itemIdByKey[key] = index;
        }
    }

    public get(key: ItemKey): Promise<TItem> {
        const index = this.itemIdByKey[key];
        const item = this.items[index];

        return Promise.resolve(item);
    }

    public getAll(): Promise<Array<TItem>> {
        return Promise.resolve(this.items);
    }

    public insert(key: ItemKey, item: TItem, atIndex?: number): Promise<void> {
        if(isDefined(this.itemIdByKey[key])) {
            throw new Error(`Item with key ${key} already exists`);
        }

        const insertAt = isDefined(atIndex) ? atIndex : this.items.length;

        this.itemIdByKey[key] = insertAt;
        this.items.splice(insertAt, 0, item);

        this.dataChange.emit({ type: 'insert', item });

        return Promise.resolve();
    }

    public delete(key: ItemKey): Promise<TItem> {
        const index = this.itemIdByKey[key];
        const deletedItem = this.items[index];

        delete this.itemIdByKey[key];
        this.items.splice(index, 1);

        this.dataChange.emit({ type: 'delete', item: deletedItem });

        return Promise.resolve(deletedItem);
    }

    public update(key: ItemKey, item: TItem): Promise<void> {
        const index = this.itemIdByKey[key];

        this.items[index] = item;

        this.dataChange.emit({ type: 'update', item });

        return Promise.resolve();
    }
}