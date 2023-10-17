import { createElement } from 'inferno-create-element';
import { ComponentViewManager } from 'core/views/manager';
import { render, VNode } from 'inferno';
import { InfernoProps } from './component';

export class InfernoViewManager extends ComponentViewManager {
    private element!: VNode;

    render(container: HTMLElement) {
        super.render(container);

        const props: InfernoProps = {
            view: this.view,
            component: this.component,
            model: this.model,
        };

        // @ts-ignore
        this.element = createElement(this.componentView, props);

        render(this.element, this.container);
    }

    /**
     * Render updated elements of inferno component
     */
    public onStateUpdate() {
        // TODO maybe we can just update props?
        (this.element.children as any).forceUpdate();

        // render(this.element, this.container);
    }

    /**
     * Calls 'onDataChange' method of inferno component
     */
    public onDataChange(): void {
        // TODO move onDataChange method to JetInfernoComponent
        (this.element.children as any).onDataChange?.();
    }
}
