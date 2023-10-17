import { JetInfernoComponent, InfernoProps } from 'core/views/inferno';

import { ListModel } from './list.model';
import { ListController } from './list.controller';
import { ListDataController } from './list.data_controller';
import { ListView } from '.';

class State {
    items: Array<any> = [];
}

export class ListInfernoView extends JetInfernoComponent<ListView, ListModel, State> {
    private readonly listController: ListController;

    private readonly dataController: ListDataController;

    constructor(props: InfernoProps<ListView, ListModel>) {
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

        const className = this.containerCssClass();

        const { selectionEnabled } = model;

        return (
            <div 
                class={className}
            >
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
