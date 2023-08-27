import { JetInfernoComponent, InfernoProps } from 'core/views/inferno';
import { ButtonModel } from './button.model';
import { ButtonController } from './button.controller';

export class ButtonInfernoView extends JetInfernoComponent<ButtonModel> {
    buttonController: ButtonController;

    constructor(props: InfernoProps<ButtonModel>) {
        super(props);

        this.buttonController = this.component.getController(ButtonController);
    }

    render() {
        const { model } = this.props;

        const className = this.compileContainerCssClass(['no-select', `${model.style}`]);

        return (
            <div
                role='button'
                class={ className }
                title={ model.title }
                style={{ height: this.height, width: this.width }}
                onClick={ (event) => this.buttonController.onClick(event) }
            >
                <div class='jet-button-content'>
                    <span class='jet-button-text'>{ model.text }</span>
                </div>
            </div>
        );
    }
}
