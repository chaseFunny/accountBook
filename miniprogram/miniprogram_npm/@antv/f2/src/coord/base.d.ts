import Layout from '../base/layout';
import { Range, Point, Option } from './types';
interface RectPoint {
    x: number | [number, number];
    y: number | [number, number];
    y0?: number;
    size?: number;
}
interface Rect {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
}
/**
 * 直角坐标系
 * convert相关的方法，涉及将标准坐标系映射到实际坐标系内
 * transform相关的方法，是仅将某一种关键点转换成另一种关键点 (比如将x/y/size/y0转换成yMin/yMax/..)
 */
declare class Base extends Layout {
    type: string;
    isPolar: boolean;
    transposed: boolean;
    center: Point;
    x: Range;
    y: Range;
    constructor(option: Option);
    update(option: Option): this;
    isCyclic(): boolean;
    _zoomVal(val: any, func: any): any;
    /**
     * 把归一后的值映射到对应的定义域
     * @param point
     */
    convert(point: any): {
        x: any;
        y: any;
    };
    /**
     * convert 的反处理，把定义域的值，反处理到归一的值
     */
    invert(point: any): {
        [x: string]: any;
    };
    /**
     * 把归一化的值映射到 canvas 的坐标点
     * @param point
     * @returns
     */
    convertPoint(point: any): {
        x: any;
        y: any;
    };
    /**
     * 把canvas坐标的点位映射回归一的值
     */
    invertPoint(point: any): {
        [x: string]: any;
    };
    convertRect(rectPoint: RectPoint): Rect;
    transformToRect(rectPoint: RectPoint): Rect;
}
export default Base;
