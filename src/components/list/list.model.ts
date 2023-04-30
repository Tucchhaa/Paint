import { BaseOptions, Model } from "../core/model";

export class ListOptions extends BaseOptions {

}

export class ListModel extends Model<ListOptions> {

    constructor(options?: ListOptions) {
        super(options);
    }

    protected getDefaultOptions(): ListOptions {
        return new ListOptions();
    }
}