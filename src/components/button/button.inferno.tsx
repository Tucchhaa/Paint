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

    protected containerCssClass(): string {
        const classList = ['no-select', `${this.model.style}`];

        if (this.hasIcon) {
            classList.push('with-icon');
        }

        if (this.model.elevated) {
            classList.push('elevated');
        }

        if (this.model.disabled) {
            classList.push('disabled');
        }

        return super.containerCssClass(classList);
    }

    render() {
        return (
            <div
                ref={ this.rootRef }

                role='button'
                tabIndex={0}

                class={ this.containerCssClass() }
                style={{ 
                    height: this.height, width: this.width, 
                    'font-size': toPixels(this.model.fontSize), 
                }}

                onClick={ this.eventHandler(this.buttonController.onClick) }
            >
                { this.hasIcon && 
                    <span class={ this.cssClass('icon') } ref={ this.iconContainerRef }></span>
                }

                <span class={ this.cssClass('text-content') }>{ this.model.text }</span>
            </div>
        );
    }
}
