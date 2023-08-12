import { Controller } from "core";
import { InputModel } from "./input.model";
import { FormEvent } from "inferno";

export class InputController extends Controller<InputModel> {
    public onValueChange(event: FormEvent<HTMLInputElement>) {
        if (!this.model.disabled) {
            this.model.value = event.currentTarget.value;

            this.model.onValueChange(event);
        }
    }
}