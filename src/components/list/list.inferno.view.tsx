import { InfernoComponent, InfernoProps } from "../core/component-views/inferno";
import { ListModel } from "./list.model";
import { ListController } from "./list.controller";
import { parseStyleSize } from "../../utils";

import "styles/common.css";
import "./list.css";

const compileClassName = () => {
    return `jet-component jet-list`;
};

export class ListInfernoView extends InfernoComponent<InfernoProps<ListModel>> {
    render() {
        const { component, model } = this.props;
        const controller = component.getController(ListController) as ListController;

        const width = parseStyleSize(model.width);
        const height = parseStyleSize(model.height);

        const className = compileClassName();

        const items = [{
            text: 'buy macbook',
        }, {
            text: 'buy iphone',
        }, {
            text: 'buy Apple watch',
        }];

        return (
            <div class={className} style={{ width, height }}>
                <ul>
                    { items.map(item => <li>{item.text}</li>) }
                </ul>
            </div>
        );
    }
}