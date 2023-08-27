import { InfernoComponent, InfernoProps } from 'core/views/inferno';

import { parseStyleSize } from 'utils/helpers';

import { ListModel } from './list.model';
import { ListController } from './list.controller';
import { ListDataController } from './list.data_controller';

const compileClassName = () => {
    return 'jet-component jet-list';
};

class State {
    items: Array<any> = [];
}

export class ListInfernoView extends InfernoComponent<ListModel, State> {
    private readonly listController: ListController;

    private readonly dataController: ListDataController;

    constructor(props: InfernoProps<ListModel>) {
        super(props);

        this.state = {
            items: [],
        };

        this.listController = this.component.getController(ListController);

        this.dataController = this.component.getController(ListDataController);
    }

    async componentDidMount() {
        const items = await this.dataController.getItems();

        this.setState({ items });
    }

    async onDataChange() {
        const items = await this.dataController.getItems();

        this.setState({ items });
    }

    render() {
        const { model } = this.props;

        const width = parseStyleSize(model.width);
        const height = parseStyleSize(model.height);
        const className = compileClassName();

        const { selectionEnabled } = model;

        return (
            <div class={className} style={{ width, height }}>
                <ul>
                    { this.state!.items.map((item, index) =>
                        <li key={index} onClick={(event) => this.listController.onItemClick(event, item)}>
                            { selectionEnabled &&
                                <div class='jet-list-item-checkbox'>
                                    <input type='checkbox' value={this.dataController.isItemSelected(item)}/>
                                </div>
                            }

                            <div class='jet-list-item-content'>{this.dataController.getItemText(item)}</div>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}
