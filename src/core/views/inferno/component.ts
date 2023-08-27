import { JetComponent } from 'core';
import { Model } from 'core/model';
import { Component } from 'inferno';

export type InfernoProps<TModel extends Model = any> = {
    component: JetComponent<TModel>,

    model: TModel,
};

export abstract class JetInfernoComponent<
    TModel extends Model = any, TState = {}
> extends Component<InfernoProps<TModel>, TState> {

    protected readonly component: JetComponent<TModel>;

    protected readonly model: TModel;

    constructor(props: InfernoProps<TModel>) {
        super(props);

        this.component = props.component;
        this.model = props.model;
    }
}
