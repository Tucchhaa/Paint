import { InfernoComponent } from "../core";
import { ButtonModel } from "./button.model";
import { ButtonController } from "./button.controller";
import { InfernoProps } from "../core/view";

export class ButtonInfernoComponent extends InfernoComponent<InfernoProps<ButtonModel>> {
    render() {
        const { component, model } = this.props;
        const controller = component.getController(ButtonController) as ButtonController;

        return (
            <button
                disabled={ model.disabled }
                title={ model.title }
                onClick={ controller.onClick.bind(controller) }
            >
                { model.text }
            </button>
        );
    }
}