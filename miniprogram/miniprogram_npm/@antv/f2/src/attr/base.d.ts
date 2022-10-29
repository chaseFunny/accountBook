import { Scale, ScaleConfig } from '@antv/scale';
declare class Base {
    data: any;
    field: string;
    scale: Scale;
    range: number[] | string[];
    callback: Function;
    constructor(options: any);
    createScale(_scaleConfig: ScaleConfig): Scale;
    _mapping(value: any): any;
    update(options: any): void;
    setRange(range: any): void;
    normalize(value: any): number | number[];
    convert(value: any): any;
    mapping(value: any, child?: any): any;
}
export default Base;
