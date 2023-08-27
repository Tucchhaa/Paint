import { JetInfernoComponent } from 'core/views/inferno';
import { IconModel } from './icon.model';

export class IconInfernoView extends JetInfernoComponent<IconModel> {
    render() {
        const { model } = this.props;

        const className = this.compileContainerCssClass('no-select');

        return (
            <span class={ className }>
                <span 
                    style={{ 
                        height: this.height, 
                        width: this.width,
                        'line-height': this.height,
                    }}
                    class={ `material-icons-${model.style}` }
                >
                    { model.icon }
                </span>
            </span>
        );
    }
}
