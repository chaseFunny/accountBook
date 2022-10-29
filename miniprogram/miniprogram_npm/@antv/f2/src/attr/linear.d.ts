import { Linear as LinearScale, ScaleConfig } from '@antv/scale';
import Base from './base';
declare class Linear extends Base {
    interpolate: any;
    range: number[];
    constructor(options: any);
    createScale(scaleConfig: ScaleConfig): LinearScale;
    _updateInterpolate(): void;
    update(options: any): void;
    _mapping(value: any): any;
    normalize(value: any): number | number[];
    convert(value: any): number | number[];
}
export default Linear;
