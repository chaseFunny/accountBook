import Component from '../../base/component';
import { ChartChildProps } from '../../chart';
import { Scale } from '@antv/scale';
export declare type ZoomRange = [number, number];
export declare type ScaleValues = number[] | string[];
export interface ZoomProps extends ChartChildProps {
    panSensitive?: number;
    pinchSensitive?: number;
    /**
     * 缩放和平移模式
     */
    mode?: 'x' | 'y' | ['x', 'y'] | null;
    /**
     * 显示的范围
     */
    range?: ZoomRange;
    /**
     * 平移
     */
    pan?: boolean;
    /**
     * 缩放
     */
    pinch?: boolean;
    /**
     * 横扫
     */
    swipe?: boolean;
    /**
     * 事件回调
     */
    onPanStart?: Function;
    onPinchStart?: Function;
    onPan?: Function;
    onPinch?: Function;
    onPanEnd?: Function;
    onPinchEnd?: Function;
    onInit?: Function;
    /**
     * 自动同步 x/y 的坐标值
     */
    autoFit?: boolean;
    /**
     * 最少展示数据量，用于控制最小缩放比例, 默认是10
     */
    minCount?: number;
}
export interface ZoomState {
    range: {
        x?: ZoomRange;
        y?: ZoomRange;
    };
}
declare class Zoom<P extends ZoomProps = ZoomProps, S extends ZoomState = ZoomState> extends Component<P, S> {
    startRange: {
        x?: ZoomRange;
        y?: ZoomRange;
    };
    scale: {};
    originScale: {};
    minScale: number;
    dims: Array<String>;
    swipeEnd: {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
    };
    loop: any;
    constructor(props: P);
    didMount(): void;
    willReceiveProps(nextProps: P): void;
    willMount(): void;
    didUnmount(): void;
    onStart: () => void;
    onPan: (ev: any) => void;
    update(): void;
    onSwipe: (ev: any) => void;
    onPinch: (ev: any) => void;
    onEnd: () => void;
    _doXPan(ev: any): ZoomRange;
    _doYPan(ev: any): ZoomRange;
    _doPan(ratio: number, dim: string): ZoomRange;
    _doXPinch(ev: any): any;
    _doYPinch(ev: any): any;
    _doPinch(startRatio: number, endRatio: number, zoom: number, dim: string): any;
    updateRange(originalRange: ZoomRange, dim: any): ZoomRange;
    updateFollow(scales: Scale[], mainScale: Scale, data: any[]): void;
    _getScale(dim: any): any;
    _getFollowScales(dim: any): any[];
    _bindEvents(): void;
    _clearEvents(): void;
}
export default Zoom;
