import { DataSource } from './data_source';
import { Model } from './model';
import { Module } from './module';

export abstract class Controller<
    TModel extends Model = any, TDataSource extends DataSource = any
> extends Module<TModel, TDataSource> {

}
