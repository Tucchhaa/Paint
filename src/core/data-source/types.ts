import { JetEvent } from "core/event";
import { ArrayStoreConfig } from "./array-store";

export type ItemKey = number | string;

export type DataSourceConfig<TItem> = {
    keyExpr: string;

    generateKey?: () => ItemKey;

    store: ArrayStoreConfig<TItem>;
};

export type DataSourceFields<TItem> = Omit<DataSourceConfig<TItem>, 'store'>;

export type DataSourceChange<TItem = any> = {
    type: 'full' | 'add' | 'delete' | 'update';

    item?: TItem;
};

export class DataSourceEvents<TArgs> {
    public change = new JetEvent<TArgs>();

    public add = new JetEvent<TArgs>();

    public delete = new JetEvent<TArgs>();

    public update = new JetEvent<TArgs>();

    public full = new JetEvent<TArgs>();
}