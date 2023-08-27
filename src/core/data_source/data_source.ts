import { BaseDataSource } from './base_data_source';
import { DataSourceConfig } from './types';

import type { ListDataSourceConfig } from 'components/list/list.data_controller';

export class DataSource<TItem = any, TKey extends keyof TItem = any> extends BaseDataSource<TItem, TKey> {
    private readonly config: DataSourceConfig<TItem>;

    constructor(config: DataSourceConfig<TItem>, dataSource?: DataSource<TItem>) {
        super(config, dataSource);
        
        this.config = config;
    }

    public static create<TItem = any, TKey extends keyof TItem = any>(config: DataSourceConfig<TItem>) {
        return new DataSource<TItem, TKey>(config);
    }

    public getConfig<T>() {
        return this.config as DataSourceConfig<TItem> & T;
    }

    // ===
    // Components extenders
    // ===

    public forList(config: ListDataSourceConfig<TItem>): DataSource<TItem, TKey> {
        const newConfig = { ...this.config as DataSourceConfig<TItem>, ...config };

        return new DataSource<TItem, TKey>(newConfig, this);
    }
}
