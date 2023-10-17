import { JetComponent, View } from 'core';
import { Model } from 'core/model';
import { Component, RefObject, createRef } from 'inferno';

const JET_CSS_CLASSES = ['component', 'no-select'];

export type InfernoProps<TView extends View = any, TModel extends Model = any> = {
    view: TView,

    component: JetComponent<TModel>,

    model: TModel,
};

export abstract class JetInfernoComponent<
    TView extends View = any, TModel extends Model = any, TState = {}
> extends Component<InfernoProps<TView, TModel>, TState> {
    protected readonly view: TView;

    protected readonly component: JetComponent<TModel>;

    protected readonly model: TModel;

    protected readonly componentName;

    /**
     * Ref to root element of Inferno component. Passes to event handlers as second parameter
     */
    protected rootRef = createRef<any>();

    constructor(props: InfernoProps<TView, TModel>) {
        super(props);

        this.view = props.view;
        this.component = props.component;
        this.model = props.model;

        this.componentName = Object.getPrototypeOf(this.component).constructor.componentName.toLowerCase();
    }

    componentDidMount(): void {
        if(this.rootRef.current) {
            this.setStateEventListeners(this.rootRef);
        }
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

    private setStateEventListeners(ref: RefObject<HTMLElement>) {
        const prefix = this.cssClass(this.componentName);
        const element = ref.current!;

        const addPrefix = (tokens: string[]) => tokens.map(token => `${prefix}-${token}`);
        const add = (...tokens: string[]) => element.classList.add(...addPrefix(tokens));
        const remove = (...tokens: string[]) => element.classList.remove(...addPrefix(tokens));

        element.addEventListener('focusin', () => add('focused'));
        element.addEventListener('focusout', () => remove('focused'));

        element.addEventListener('mouseover', () => add('hovered'));
        element.addEventListener('mouseleave', () => remove('hovered', 'clicked'));

        element.addEventListener('mousedown', () => add('clicked'));
        element.addEventListener('mouseup', () => remove('clicked'));
    }

    protected eventHandler<TEvent>(handler: (event: TEvent) => void) {
        return (event: TEvent) => {
            handler(event);
        };
    }
}
