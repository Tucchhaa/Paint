import { BaseState, Model, stateProperty } from 'core/model';

export type ListState = BaseState & Partial<{
    selectionEnabled: boolean;
}>;

export class ListModel extends Model<ListState> implements ListState {
    @stateProperty
    public selectionEnabled: boolean = false;

    constructor(state?: ListState) {
        super(state);

        this.assignState(state);
    }
}
