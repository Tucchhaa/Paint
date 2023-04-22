import { Controller } from "../core/controller";
import { ButtonModel } from "./button.model";

export class ButtonController extends Controller<ButtonModel> {
    public onClick(event: MouseEvent) {
        if (this.model.disabled === false) {
            this.model.onClick(event);
        }
    }
}