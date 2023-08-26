import { ItemKey } from './types';

export abstract class Store<TItem = any> {
    public abstract add(key: ItemKey, item: TItem): Promise<void>;

    public abstract get(key: ItemKey): Promise<TItem>;

    public abstract getAll(): Promise<Array<TItem>>;

    public abstract update(key: ItemKey, item: TItem): Promise<void>;

    public abstract delete(key: ItemKey): Promise<TItem>;
}

