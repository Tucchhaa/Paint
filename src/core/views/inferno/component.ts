import { DataSource } from 'core/data_source';
import { JetComponent } from 'core';
import { Model } from 'core/model';
import { Component } from 'inferno';

export type InfernoProps<TModel extends Model = any, TDataSource extends DataSource = any> = {
    component: JetComponent<TModel, TDataSource>,

    model: TModel,

    dataSource: TDataSource,
};

export abstract class InfernoComponent<
    TModel extends Model = any, TDataSource extends DataSource = any, TState = {}
> extends Component<InfernoProps<TModel, TDataSource>, TState> {

    protected readonly component: JetComponent<TModel, TDataSource>;

    protected readonly model: TModel;

    protected readonly dataSource: TDataSource;

    constructor(props: InfernoProps<TModel, TDataSource>) {
        super(props);

        this.component = props.component;
        this.model = props.model;
        this.dataSource = props.dataSource;
    }
}
