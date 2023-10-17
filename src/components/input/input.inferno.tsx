import { JetInfernoComponent } from 'core/views/inferno';
import { InputModel } from './input.model';
import { InputController } from './input.controller';
import { createRef } from 'inferno';
import { InputView } from '.';

export class InputInfernoView extends JetInfernoComponent<InputView, InputModel> {
    inputRef = createRef<HTMLInputElement>();

    // ===

    inputController: InputController = this.component.getController(InputController);

    // ===

    componentDidMount(): void {
        super.componentDidMount();

        this.view.inputElement = this.inputRef.current!;
    }

    render() {
        const { component, model } = this.props;
        const controller = component.getController(InputController) as InputController;

        const { label, value, name, style } = model;

        return (
            <div 
                ref={this.rootRef}
                class={ this.containerCssClass(style) }
            >
                {
                    label &&
                    <label 
                        class={ this.cssClass(['label', 'no-select']) }
                        for={name}
                    >{ label }</label>
                }
                <input 
                    type='text' 
                    name={name} 
                    id={name}
                    value={value}

                    ref={this.inputRef}
                    onInput={controller.onValueChange.bind(controller)} />
            </div>
        );
    }
}