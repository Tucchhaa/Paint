import { JetInfernoComponent } from 'core/views/inferno';
import { ButtonModel } from './button.model';
import { ButtonController } from './button.controller';
import { createRef } from 'inferno';
import { isDefined } from 'utils/helpers';
import { ButtonView } from '.';

export class ButtonInfernoView extends JetInfernoComponent<ButtonView, ButtonModel> {
    get hasText() { return isDefined(this.model.text); }

    get hasIcon() { return isDefined(this.model.icon); }

    // ===

    iconContainerRef = createRef<HTMLElement>();

    buttonController: ButtonController = this.component.getController(ButtonController);

    // ===

    componentDidMount(): void {
        super.componentDidMount();

        if (this.hasIcon) {
            const { icon } = this.model;

            icon!.render(this.iconContainerRef.current!);
        }
    }

    protected containerCssClass(): string {
        const classList = ['no-select', this.model.style];

        if (this.hasIcon) {
            classList.push(this.hasText ? 'with-icon' : 'only-icon');
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

                onClick={ this.eventHandler(this.buttonController.onClick) }
            >
                { this.hasIcon && 
                    <span class={ this.cssClass('icon') } ref={ this.iconContainerRef }></span>
                }
                
                { this.hasText &&
                    <span 
                        class={ this.cssClass('text-content') }
                    >
                        { this.model.text }
                    </span>
                }
            </div>
        );
    }
}
