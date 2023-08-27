import { BaseState, Model, model } from 'core/model';

export type IconStyle = 'outlined' | 'rounded' | 'sharp';

export type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type IconGrade = -25 | 0 | 200;

export type OpticalSize = 20 | 24 | 40 | 48;

export type IconState = Omit<BaseState, 'disabled'> & {
    /**
     * Name of icon from Google Material Icons website
     */
    icon: string;

    style?: IconStyle;

    fill?: boolean;

    weight?: IconWeight;

    grade?: IconGrade;

    opticalSize?: OpticalSize;
};

@model
export class IconModel extends Model<IconState> {
    /**
     * Name of icon from Google Material Icons website
     */
    icon = '';
    
    style: IconStyle = 'outlined';

    fill = false;

    weight: IconWeight = 400;

    grade: IconGrade = 0;

    opticalSize: OpticalSize = 24;

    constructor(state?: IconState) {
        super(state);

        this.assignState(state);
    }
}