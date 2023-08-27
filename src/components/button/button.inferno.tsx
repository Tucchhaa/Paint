import { InfernoComponent, InfernoProps } from 'core/views/inferno';
import { ButtonModel, ButtonStyleMode } from './button.model';
import { ButtonController } from './button.controller';
import { parseStyleSize } from 'utils/helpers';

const compileClassName = (styleMode: ButtonStyleMode) => {
    return `jet-component jet-button jet-no-select jet-button-${styleMode}-mode`;
};

export class ButtonInfernoView extends InfernoComponent<ButtonModel> {
    buttonController: ButtonController;

    constructor(props: InfernoProps<ButtonModel>) {
        super(props);

        this.buttonController = this.component.getController(ButtonController);
    }

    render() {
        const { model } = this.props;

        const width = parseStyleSize(model.width);
        const height = parseStyleSize(model.height);

        const className = compileClassName(model.styleMode);

        return (
            <div
                role='button'
                class={ className }
                title={ model.title }
                style={{ height, width }}
                onClick={ (event) => this.buttonController.onClick(event) }
            >
                <div class='jet-button-content'>
                    <span class='jet-button-text'>{ model.text }</span>
                </div>
            </div>
        );
    }
}