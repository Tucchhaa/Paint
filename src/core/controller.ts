import { Model } from './model';
import { Module } from './module';

export abstract class Controller<TModel extends Model = any> extends Module<TModel> {

}
