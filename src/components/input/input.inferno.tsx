import { JetInfernoComponent } from 'core/views/inferno';
import { InputModel } from './input.model';
import { InputController } from './input.controller';

export class InputInfernoView extends JetInfernoComponent<InputModel> {
    render() {
        const { component, model } = this.props;
        const controller = component.getController(InputController) as InputController;

        const { label, value, name } = model;

        const className = this.containerCssClass();

        return (
            <div 
                class={className} 
                style={{ height: this.height, width: this.width }}
            >
                <label>
                    <span class='jet-input-label-text'>{label}</span>
                    <input type='text' name={name} value={value} onInput={controller.onValueChange.bind(controller)}/>
                </label>
            </div>
        );
    }
}