import { JetInfernoComponent, InfernoProps } from 'core/views/inferno';
import { ButtonModel } from './button.model';
import { ButtonController } from './button.controller';
import { createRef } from 'inferno';
import { isDefined, toPixels } from 'utils/helpers';

export class ButtonInfernoView extends JetInfernoComponent<ButtonModel> {
    // ===
    // Icon
    // ===
    hasIcon = isDefined(this.props.model.icon);

    iconContainerRef = createRef<HTMLElement>();

    // ===

    buttonController: ButtonController = this.component.getController(ButtonController);

    constructor(props: InfernoProps<ButtonModel>) {
        super(props);
    }

    componentDidMount(): void {
        this.setStateEventListeners(this.rootRef, this.cssClass(this.componentName));

        if (this.hasIcon) {
            const { icon } = this.model;

            icon!.render(this.iconContainerRef.current!);
        }
    }

    render() {
        return (
            <div
                ref={ this.rootRef }

                role='button'
                tabIndex={0}

                class={ this.containerCssClass(['no-select', `${this.model.style}`]) }
                style={{ 
                    height: this.height, width: this.width, 
                    'font-size': toPixels(this.model.fontSize), 
                }}

                onClick={ this.eventHandler(this.buttonController.onClick) }
                // onMouseEnter={ this.eventHandler(this.buttonController.onMouseEnter) }
                // onMouseOut={ this.buttonController.onMouseOut }
                // onFocus={ this.buttonController.onFocus }
                // onBlur={ this.buttonController.onBlur }
                // onMouseDown={  }
            >
                { this.hasIcon && 
                    <span class={ this.cssClass('icon') } ref={ this.iconContainerRef }></span>
                }

                <span class={ this.cssClass('text') }>{ this.model.text }</span>
            </div>
        );
    }
}
