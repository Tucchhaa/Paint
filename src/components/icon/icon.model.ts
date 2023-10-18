import { Model, State, model, stateProperty } from 'core/model';

export type IconStyle = 'outlined' | 'round' | 'sharp';

export type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type IconGrade = -25 | 0 | 200;

export type OpticalSize = 20 | 24 | 40 | 48;

export type IconState = State<IconModel>;

@model
export class IconModel extends Model {
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