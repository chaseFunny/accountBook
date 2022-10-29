import Chart from '../../chart';
import Coord from '../../coord';
import { AnimationCycle } from '../../canvas/animation/interface';
import { SelectionProps } from './selection';
export interface AttrRange {
    shape?: any[];
    color?: any[];
    size?: any[];
}
export declare type GeomType = 'line' | 'point' | 'area' | 'polygon' | 'schema' | 'interval';
interface Style {
    [k: string]: any;
}
/**
 * 几何标记对象的数据调整类型。
 */
export declare type GeometryAdjustType = 'stack' | 'dodge' | 'symmetric';
export declare type GeometryAdjust = {
    type: GeometryAdjustType;
    [k: string]: any;
};
export declare type AdjustConfig = GeometryAdjust | GeometryAdjustType;
export interface GeometryProps extends SelectionProps {
    data?: any;
    adjust?: AdjustConfig;
    chart?: Chart;
    coord?: Coord;
    startOnZero?: boolean;
    style?: Style;
    animation?: AnimationCycle;
    [k: string]: any;
}
export {};
