import { AxisTypes } from './components/axis/types';
import type { Types } from '@antv/f2-graphic';
declare type PX_FIELD_NAME = 'lineWidth' | 'lineDash' | 'x' | 'y' | 'r' | 'r0' | 'x1' | 'y1' | 'x2' | 'y2' | 'radius' | 'width' | 'height' | 'fontSize' | 'sx' | 'sy' | 'swidth' | 'sheight' | 'points' | 'shadowBlur' | 'shadowOffsetX' | 'shadowOffsetY';
declare type pxstr = `${number}px`;
export declare type px = number | pxstr | string;
export declare type Point = Types.Point;
export interface PxPoint {
    x: px;
    y: px;
}
export interface DataRecord {
    origin: any;
    [k: string]: any;
}
export * from '@antv/scale';
export type { AxisTypes };
declare type SupportPx<T> = {
    [k in keyof T]: k extends PX_FIELD_NAME ? NonNullable<T[k]> extends number ? number | pxstr : NonNullable<T[k]> extends number[] ? number[] | pxstr[] : NonNullable<T[k]> extends Types.Point[] ? PxPoint[] : T[k] : T[k];
};
export interface Style {
    width?: px;
    height?: px;
    minWidth?: px;
    minHeight?: px;
    maxWidth?: px;
    maxHeight?: px;
    left?: px;
    right?: px;
    top?: px;
    bottom?: px;
    margin?: px | px[];
    marginTop?: px;
    marginRight?: px;
    marginBottom?: px;
    marginLeft?: px;
    padding?: px | px[];
    paddingTop?: px;
    paddingRight?: px;
    paddingBottom?: px;
    paddingLeft?: px;
    flexDirection?: 'column' | 'row';
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
    alignSelf?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
    display?: 'flex';
    flex?: number;
    flexWrap?: 'wrap' | 'nowrap';
    position?: 'relative' | 'absolute';
    backgroundColor?: string;
}
interface IntrinsicElementsProps {
    style?: Style;
    [k: string]: any;
}
export interface Ref {
    current?: any;
}
export interface Props {
    children?: any;
    [propName: string]: any;
}
export declare type ElementType = string | ((props: Props, context?: any) => any) | (new (props: Props, context?: any) => any);
export interface ShapeAttrs extends Partial<SupportPx<Types.ShapeAttrs>> {
    [k: string]: any;
}
export interface GroupProps extends IntrinsicElementsProps {
    attrs?: RectAttrs;
}
export declare type CircleAttrs = Partial<SupportPx<Types.CircleAttrs>>;
export interface CircleProps extends IntrinsicElementsProps {
    attrs?: CircleAttrs;
}
export declare type RectAttrs = Partial<SupportPx<Types.RectAttrs>>;
export interface RectProps extends IntrinsicElementsProps {
    attrs?: RectAttrs;
}
export declare type LineAttrs = Partial<SupportPx<Types.LineAttrs>>;
export interface LineProps extends IntrinsicElementsProps {
    attrs?: LineAttrs;
}
export declare type PolygonAttrs = Partial<SupportPx<Types.PolygonAttrs>>;
export interface PolygonProps extends IntrinsicElementsProps {
    attrs?: PolygonAttrs;
}
export declare type PolylineAttrs = Partial<SupportPx<Types.PolylineAttrs>>;
export interface PolylineProps extends IntrinsicElementsProps {
    attrs?: PolylineAttrs;
}
export declare type ArcAttrs = Partial<SupportPx<Types.ArcAttrs>>;
export interface ArcProps extends IntrinsicElementsProps {
    attrs?: ArcAttrs;
}
export declare type SectorAttrs = Partial<SupportPx<Types.SectorAttrs>>;
export interface SectorProps extends IntrinsicElementsProps {
    attrs?: SectorAttrs;
}
export declare type TextAttrs = Partial<SupportPx<Types.TextAttrs>>;
export interface TextProps extends IntrinsicElementsProps {
    attrs?: TextAttrs;
}
export declare type CustomAttrs = Partial<SupportPx<Types.CustomAttrs>>;
export interface CustomProps extends IntrinsicElementsProps {
    attrs?: CustomAttrs;
}
export declare type MarkerAttrs = Partial<SupportPx<Types.MarkerAttrs>>;
export interface MarkerProps extends IntrinsicElementsProps {
    attrs?: MarkerAttrs;
}
export declare type ImageAttrs = Partial<SupportPx<Types.ImageAttrs>>;
export interface ImageProps extends IntrinsicElementsProps {
    attrs?: ImageAttrs;
}
