import { JetComponent } from 'core';
import { Model } from 'core/model';
import { Component } from 'inferno';
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

    private readonly componentName;

    protected width?: string;

    protected height?: string;

    constructor(props: InfernoProps<TModel>) {
        super(props);

        this.component = props.component;
        this.model = props.model;

        this.componentName = Object.getPrototypeOf(this.component).constructor.componentName.toLowerCase();
        
        this.width = toPixels(this.model.width);
        this.height = toPixels(this.model.height);
    }

    componentDidUpdate(prevProps: Readonly<InfernoProps<TModel>>, prevState: Readonly<TState>): void {
        this.width = toPixels(prevProps.model.width);
        this.height = toPixels(prevProps.model.height);
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
}
