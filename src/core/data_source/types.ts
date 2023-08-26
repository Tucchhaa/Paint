import { JetEvent } from 'core/event';
import { ArrayStoreConfig } from './array_store';

// ===
// Internal types
// ===

export type ItemKey = number | string;

export type DataSourceFields<TItem> = Omit<DataSourceConfig<TItem>, 'store'>;

export class DataSourceEvents<TArgs> {
    public change = new JetEvent<TArgs>();

    public add = new JetEvent<TArgs>();

    public delete = new JetEvent<TArgs>();

    public update = new JetEvent<TArgs>();

    public full = new JetEvent<TArgs>();
}

export type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

// ===
// Export types
// ===

export type DataSourceConfig<TItem> = {
    key: keyof TItem;

    generateKey?: () => ItemKey;

    store: ArrayStoreConfig<TItem>;
};


export type DataSourceChange<TItem = any> = {
    type: 'full' | 'add' | 'delete' | 'update';

    item?: TItem;
};
