import { BaseOptions, Model } from "core/model";

export class ListOptions extends BaseOptions {
    selectionEnabled?: boolean = false;
}

export class ListModel extends Model<ListOptions> {
    public selectionEnabled!: boolean;

    constructor(options?: ListOptions) {
        super(options);
    }

    protected getDefaultOptions(): ListOptions {
        return new ListOptions();
    }
}