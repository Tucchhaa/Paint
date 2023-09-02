import { Model, model, stateProperty } from 'core/model';

export type IconStyle = 'outlined' | 'rounded' | 'sharp';

export type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type IconGrade = -25 | 0 | 200;

export type OpticalSize = 20 | 24 | 40 | 48;

export type IconState = {
    /**
     * Name of icon from Google Material Icons website
     */
    icon: string;

    size?: number;

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
    @stateProperty
    public icon!: string;

    @stateProperty
    public size: number = 20;
    
    @stateProperty
    public style: IconStyle = 'outlined';

    @stateProperty
    public fill = false;

    @stateProperty
    public weight: IconWeight = 400;

    @stateProperty
    public grade: IconGrade = 0;

    @stateProperty
    public opticalSize: OpticalSize = 24;
}