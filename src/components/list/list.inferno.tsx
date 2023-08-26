import { InfernoComponent, InfernoProps } from 'core/views/inferno';

import { parseStyleSize } from 'utils/helpers';

import { ListModel } from './list.model';
import { ListDataSource } from './list.data-source';
import { ListController } from './list.controller';

const compileClassName = () => {
    return 'jet-component jet-list';
};

class State {
    items: Array<any> = [];
}

export class ListInfernoView extends InfernoComponent<ListModel, ListDataSource, State> {
    constructor(props: InfernoProps<ListModel>) {
        super(props);

        this.state = {
            items: [],
        };
    }

    componentDidMount(): void {
        this.props.dataSource.getItems().then(items => {
            this.setState({ items });
        });
    }

    onDataChange() {
        this.props.dataSource.getItems().then(items => {
            this.setState({ items });
        });
    }

    render() {
        const { component, model } = this.props;
        const dataSource = this.props.dataSource;
        const controller = component.getController(ListController) as ListController;

        const width = parseStyleSize(model.width);
        const height = parseStyleSize(model.height);
        const className = compileClassName();

        const { selectionEnabled } = model;

        return (
            <div class={className} style={{ width, height }}>
                <ul>
                    { this.state!.items.map((item, index) =>
                        <li key={index} onClick={(event) => controller.onItemClick(event, item)}>
                            { selectionEnabled &&
                                <div class='jet-list-item-checkbox'>
                                    <input type='checkbox' value={dataSource.isItemSelected(item)}/>
                                </div>
                            }

                            <div class='jet-list-item-content'>{dataSource.getItemText(item)}</div>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}
