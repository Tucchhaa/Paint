import { JetEvent } from 'core/event';
import { DataChange, ItemKey } from './types';

export abstract class Store<TItem = any> {
    public dataChange = new JetEvent<DataChange<TItem>>();

    public abstract insert(key: ItemKey, item: TItem, atIndex?: number): Promise<void>;

    public abstract get(key: ItemKey): Promise<TItem>;

    public abstract getAll(): Promise<Array<TItem>>;

    public abstract update(key: ItemKey, item: TItem): Promise<void>;

    public abstract delete(key: ItemKey): Promise<TItem>;
}

