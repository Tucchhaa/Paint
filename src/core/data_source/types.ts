import { JetEvent } from 'core/event';
import { ArrayStoreConfig } from './array_store';

// ===
// Internal types
// ===

export type ItemKey = number | string;

/**
 * User should be able to get all passed props directly from data source
 */
export class DataSourceEvents<TItem> {
    public change = new JetEvent<DataChange<TItem>>();

    public insert = new JetEvent<DataChange<TItem>>();

    public delete = new JetEvent<DataChange<TItem>>();

    public update = new JetEvent<DataChange<TItem>>();

    public full = new JetEvent<DataChange<TItem>>();
}

export type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

// ===
// Export types
// ===

export type DataSourceConfig<TItem = any> = {
    key: keyof TItem;

    generateKey?: () => ItemKey;

    store: ArrayStoreConfig<TItem>;
};


export type DataChange<TItem = any> = {
    type: 'full' | 'insert' | 'delete' | 'update';

    item?: TItem;
};
