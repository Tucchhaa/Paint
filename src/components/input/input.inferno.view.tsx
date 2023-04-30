import { InfernoComponent, InfernoProps } from "../core/component-views/inferno";
import { InputModel } from "./input.model";
import { InputController } from "./input.controller";
import { parseStyleSize } from "../../utils";

import "styles/common.css";
import "./input.css";

const compileClassName = () => {
    return `jet-component jet-input`;
};

export class InputInfernoView extends InfernoComponent<InfernoProps<InputModel>> {
    render() {
        const { component, model } = this.props;
        const controller = component.getController(InputController) as InputController;

        const { label, value, name } = model;

        const width = parseStyleSize(model.width);
        const height = parseStyleSize(model.height);

        const className = compileClassName();

        return (
            <div class={className} style={{ width, height }}>
                <label>
                    <span class="jet-input-label-text">{label}</span>
                    <input type="text" name={name} value={value} onInput={controller.onValueChange.bind(controller)}/>
                </label>
            </div>
        );
    }
}