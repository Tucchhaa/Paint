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


    protected containerCssClass(): string {
        const classList: string[] = [this.model.style];

        if (this.model.disabled) {
            classList.push('disabled');
        }

        return super.containerCssClass(classList);
    }

    render() {
        const { component, model } = this.props;
        const controller = component.getController(InputController) as InputController;

        const { label, value, name, disabled } = model;

        return (
            <div 
                ref={this.rootRef}
                class={ this.containerCssClass() }
            >
                {
                    label &&
                    <label 
                        class={ this.cssClass(['no-select']) }
                        for={name}
                    >{ label }</label>
                }
                <input 
                    type='text' 
                    name={name} 
                    id={name}
                    value={value}
                    disabled={disabled}

                    ref={this.inputRef}
                    onInput={controller.onValueChange.bind(controller)} />
            </div>
        );
    }
}