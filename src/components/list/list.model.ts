import { Model, State, model, stateProperty } from 'core/model';

export type ListState = State<ListModel>;

@model
export class ListModel extends Model {
    @stateProperty
    public selectionEnabled: boolean = false;
}
