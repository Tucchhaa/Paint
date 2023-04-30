import { InfernoComponent, InfernoProps } from "../core/component-views/inferno";
import { ListModel } from "./list.model";
import { parseStyleSize } from "../../utils";

import "styles/common.css";
import "./list.css";
import { ListDataSource } from "./list.data-source";

const compileClassName = () => {
    return `jet-component jet-list`;
};

export class ListInfernoView extends InfernoComponent<InfernoProps<ListModel>> {
    render() {
        const { model } = this.props;
        const dataSource = this.props.dataSource as ListDataSource<any>;

        const width = parseStyleSize(model.width);
        const height = parseStyleSize(model.height);

        const className = compileClassName();

        const items = dataSource.getItems();

        return (
            <div class={className} style={{ width, height }}>
                <ul>
                    { items.map(item => <li>{dataSource.text(item)}</li>) }
                </ul>
            </div>
        );
    }
}