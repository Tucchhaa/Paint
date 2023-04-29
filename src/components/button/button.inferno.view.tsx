import { InfernoComponent, InfernoProps } from "../core/inferno";
import { ButtonModel } from "./button.model";
import { ButtonController } from "./button.controller";
import { parseStyleSize } from "../../utils";

export class ButtonInfernoView extends InfernoComponent<InfernoProps<ButtonModel>> {
    render() {
        const { component, model } = this.props;
        const controller = component.getController(ButtonController) as ButtonController;

        const width = parseStyleSize(model.width);
        const height = parseStyleSize(model.height);

        return (
            <div
                role="button"
                title={ model.title }
                style={{ height, width }}
                onClick={ controller.onClick.bind(controller) }
            >
                { model.text }
            </div>
        );
    }
}