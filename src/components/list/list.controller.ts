import { Controller } from "../core";
import { ListModel } from "./list.model";
import { ListDataSource } from "./list.data-source";

export class ListController extends Controller<ListModel> {
    dataSource!: ListDataSource<any>;
    public initialize() {
        this.dataSource = this.component.dataSource as ListDataSource<any>;
    }

    public onItemClick(event: MouseEvent, item: any) {

    }
}