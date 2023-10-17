import { JetInfernoComponent } from 'core/views/inferno';
import { IconModel } from './icon.model';
import { toPixels } from 'utils/helpers';
import { IconView } from '.';

export class IconInfernoView extends JetInfernoComponent<IconView, IconModel> {
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
