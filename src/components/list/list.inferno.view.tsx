import { InfernoComponent, InfernoProps } from "core/views/inferno";
import { parseStyleSize } from "utils/helpers";

import { ListModel } from "./list.model";
import { ListDataSource } from "./list.data-source";
import { ListController } from "./list.controller";

import "styles/common.css";
import "./list.css";


const compileClassName = () => {
    return `jet-component jet-list`;
};

export class ListInfernoView extends InfernoComponent<InfernoProps<ListModel>> {
    render() {
        const { component, model } = this.props;
        const dataSource = this.props.dataSource as ListDataSource<any>;
        const controller = component.getController(ListController) as ListController;

        const width = parseStyleSize(model.width);
        const height = parseStyleSize(model.height);
        const className = compileClassName();

        const { selectionEnabled } = model;

        const items = dataSource.getItems();

        return (
            <div class={className} style={{ width, height }}>
                <ul>
                    { items.map(item =>
                        <li onClick={(event) => controller.onItemClick(event, item)}>
                            { selectionEnabled &&
                                <div class="jet-list-item-checkbox">
                                    <input type="checkbox" value={dataSource.isItemSelected(item)}/>
                                </div>
                            }

                            <div class="jet-list-item-content">{dataSource.getItemText(item)}</div>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}