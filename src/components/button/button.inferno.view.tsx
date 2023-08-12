import { InfernoComponent, InfernoProps } from "core/views/inferno";
import { ButtonModel, ButtonStyleMode } from "./button.model";
import { ButtonController } from "./button.controller";
import { parseStyleSize } from "utils/helpers";

import "styles/common.css";
import "./button.css";

const compileClassName = (styleMode: ButtonStyleMode) => {
    return `jet-component jet-button jet-no-select jet-button-${styleMode}-mode`;
};

export class ButtonInfernoView extends InfernoComponent<InfernoProps<ButtonModel>> {
    render() {
        const { component, model } = this.props;
        const controller = component.getController(ButtonController) as ButtonController;

        const width = parseStyleSize(model.width);
        const height = parseStyleSize(model.height);

        const className = compileClassName(model.styleMode);

        return (
            <div
                role="button"
                class={className}
                title={ model.title }
                style={{ height, width }}
                onClick={ controller.onClick.bind(controller) }
            >
                <div class="jet-button-content">
                    <span class="jet-button-text">{ model.text }</span>
                </div>
            </div>
        );
    }
}