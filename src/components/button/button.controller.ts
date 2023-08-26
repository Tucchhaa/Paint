import { Controller } from 'core';
import { ButtonModel } from './button.model';

export class ButtonController extends Controller<ButtonModel> {
    public onClick(event: MouseEvent) {
        if (!this.model.disabled) {
            this.model.onClick(event, this.getPublicComponent());
        }
    }
}