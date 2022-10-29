import Component from '../../base/component';
import { DataRecord, px, TextAttrs, LineAttrs, RectAttrs } from '../../types';
import { ChartChildProps } from '../../chart';
export interface TooltipProps extends ChartChildProps {
    /**
     * 顶部边距
     */
    padding?: px;
    /**
     * 显示事件名，默认为 press, 可以为 touchstart 等
     */
    triggerOn?: string;
    /**
     * 消失的事件名，默认为 pressend, 可以为 touchend 等
     */
    triggerOff?: string;
    /**
     * 是否一直显示
     */
    alwaysShow?: boolean;
    /**
     * 是否显示十字线
     */
    showCrosshairs?: boolean;
    /**
     * 十字线类型
     */
    crosshairsType?: 'x' | 'y' | 'xy';
    /**
     * 十字线样式
     */
    crosshairsStyle?: LineAttrs;
    snap?: boolean;
    /**
     * 名称样式
     */
    nameStyle?: TextAttrs;
    /**
     * 值样式
     */
    valueStyle?: TextAttrs;
    /**
     * 背景样式
     */
    background?: RectAttrs;
    /**
     * 是否显示
     */
    showItemMarker?: boolean;
}
export interface TooltipState {
    records: DataRecord[];
}
declare const _default: (View: any) => {
    new (props: TooltipProps): {
        updateCoord(): void;
        willMount(): void;
        didMount(): void;
        willReceiveProps(nextProps: any): void;
        _initShow(): void;
        _showByData(dataItem: any): void;
        _triggerOn: (ev: any) => void;
        _triggerOff: () => void;
        _initEvent(): void;
        didUnmount(): void;
        _clearEvents(): void;
        show(point: any, _ev?: any): void;
        hide(): void;
        render(): import("../..").JSX.Element;
        props: TooltipProps;
        state: TooltipState;
        context: import("../../base/component").ComponentContext;
        refs: {
            [key: string]: Component<any, any>;
        };
        updater: import("../../base/component").Updater<TooltipState>;
        children: import("../..").JSX.Element;
        container: any;
        animate: boolean;
        destroyed: boolean;
        willUpdate(): void;
        didUpdate(): void;
        setState(partialState: TooltipState, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        setAnimate(animate: boolean): void;
        destroy(): void;
    };
};
export default _default;
