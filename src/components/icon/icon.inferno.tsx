import { JetInfernoComponent } from 'core/views/inferno';
import { IconModel } from './icon.model';
import { toPixels } from 'utils/helpers';

export class IconInfernoView extends JetInfernoComponent<IconModel> {
    iconCssClass = `material-icons-${this.model.style} ${this.cssClass('no-select')}`;

    size = toPixels(this.model.size);

    render() {
        return (
            <span 
                style={{
                    'font-size': this.size,
                }}
                class={ this.iconCssClass }
            >
                { this.model.icon }
            </span>
        );
    }
}
