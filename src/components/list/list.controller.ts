import { Controller } from 'core';
import { ListModel } from './list.model';
import { ListDataSource } from './list.data-source';

export class ListController extends Controller<ListModel, ListDataSource> {

    public initialize() {

    }

    public onItemClick(event: MouseEvent, item: any) {

    }
}