import { Model } from './model';
import { Module } from './module';

export abstract class Controller<TModel extends Model> extends Module<TModel> {

}
