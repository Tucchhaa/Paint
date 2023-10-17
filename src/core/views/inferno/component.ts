import { JetComponent } from 'core';
import { Model } from 'core/model';
import { Component, RefObject, createRef } from 'inferno';
import { toPixels } from 'utils/helpers';

const JET_CSS_CLASSES = ['component', 'no-select'];

export type InfernoProps<TModel extends Model = any> = {
    component: JetComponent<TModel>,

    model: TModel,
};

export abstract class JetInfernoComponent<
    TModel extends Model = any, TState = {}
> extends Component<InfernoProps<TModel>, TState> {
    protected readonly component: JetComponent<TModel>;

    protected readonly model: TModel;

    protected readonly componentName;

    protected get width(): string | undefined {
        return toPixels(this.model.width);
    }

    protected get height(): string | undefined {
        return toPixels(this.model.height);
    }

    /**
     * Ref to root element of Inferno component. Passes to event handlers as second parameter
     */
    protected rootRef = createRef<any>();

    constructor(props: InfernoProps<TModel>) {
        super(props);

        this.component = props.component;
        this.model = props.model;

        this.componentName = Object.getPrototypeOf(this.component).constructor.componentName.toLowerCase();
    }

    // ===
    // Methods
    // ===

    /**
     * Returns css class to be assigned to component container 
     * @param cssClass list of classes without prefix
     * @returns concatenated classes with prefixes
     */
    protected containerCssClass(cssClass: string | string[] = []) {
        const classList = ['component', this.componentName].concat(cssClass);

        return this.cssClass(classList);
    }

    /**
     * 
     * @param cssClass list of classes without prefix
     * @returns concatenated classes with prefixes
     */
    protected cssClass(cssClass: string | string[] = []) {
        const flatClassList = Array.isArray(cssClass) ? cssClass : [cssClass];

        const jetClassList = flatClassList
            .filter(cssClass => this.isJetClass(cssClass))
            .map(cssCLass => `jet-${cssCLass}`);

        const componentClassList = flatClassList
            .filter(cssClass => !this.isJetClass(cssClass))
            .map(cssClass => `jet-${this.componentName}-${cssClass}`);

        return componentClassList.concat(jetClassList).join(' ');
    }

    private isJetClass(cssClass: string): boolean {
        return JET_CSS_CLASSES.includes(cssClass) || cssClass === this.componentName;
    }

    // ===
    // DOM events
    // ===

    protected setStateEventListeners(ref: RefObject<HTMLElement>, classPrefix: string) {
        const element = ref.current!;

        const addPrefix = (tokens: string[]) => tokens.map(token => `${classPrefix}-${token}`);
        const add = (...tokens: string[]) => element.classList.add(...addPrefix(tokens));
        const remove = (...tokens: string[]) => element.classList.remove(...addPrefix(tokens));

        element.addEventListener('focus', () => add('focused'));
        element.addEventListener('blur', () => remove('focused'));

        element.addEventListener('mouseenter', () => add('hovered'));
        element.addEventListener('mouseout', () => remove('hovered', 'clicked', 'focused'));

        element.addEventListener('mousedown', () => add('clicked'));
        element.addEventListener('mouseup', () => remove('clicked', 'focused'));
    }

    protected eventHandler<TEvent>(handler: (event: TEvent, root: HTMLElement) => void) {
        return (event: TEvent) => {
            handler(event, this.rootRef.current!);
        };
    }
}
