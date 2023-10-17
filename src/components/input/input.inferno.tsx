import { JetInfernoComponent } from 'core/views/inferno';
import { InputModel } from './input.model';
import { InputController } from './input.controller';
import { createRef } from 'inferno';

export class InputInfernoView extends JetInfernoComponent<InputModel> {
    // ===
    // Icon
    // ===

    get hasIcon() { return false; }

    iconContainerRef = createRef<HTMLElement>();

    // ===

    render() {
        const { component, model } = this.props;
        const controller = component.getController(InputController) as InputController;

        const { label, value, name, style } = model;

        return (
            <div 
                class={ this.containerCssClass(style) } 
            >
                <label 
                    class={ this.cssClass('label') }
                    for={name}
                >{ label }</label>

                <input 
                    type='text' 
                    name={name} 
                    id={name}
                    value={value}
                    onInput={controller.onValueChange.bind(controller)} />
            </div>
        );
    }
}