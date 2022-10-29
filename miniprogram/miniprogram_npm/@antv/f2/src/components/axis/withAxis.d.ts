import { PositionLayout } from '../../chart/index';
import Component from '../../base/component';
import { Style, AxisProps } from './types';
declare type BBox = {
    height: number;
    width: number;
};
declare const _default: (View: any) => {
    new (props: AxisProps): {
        style: Style;
        willReceiveProps(nextProps: AxisProps): void;
        willMount(): void;
        willUpdate(): void;
        getScaleOption(props: AxisProps): {
            type: any;
            tickCount: any;
            range: any;
            mask: any;
            formatter: any;
            min: any;
            max: any;
            nice: any;
            ticks: any;
        };
        _getDimType(): 'x' | 'y';
        getMaxBBox(ticks: any, style: Style): BBox;
        _getPosition(): "right" | "left" | "top" | "bottom";
        getTicks(): import("@antv/scale").Tick[];
        /**
         * 生成极坐标下网格线的交叉点
         * @param ticks
         * @returns
         */
        _generateGridPoints(ticks: any): any;
        _setTicksStyle(ticks: any): any;
        convertTicks(ticks: any): any;
        measureLayout(): PositionLayout | PositionLayout[];
        updateCoord(): void;
        render(): import("../..").JSX.Element;
        props: AxisProps;
        state: {};
        context: import("../../base/component").ComponentContext;
        refs: {
            [key: string]: Component<any, any>;
        };
        updater: import("../../base/component").Updater<{}>;
        children: import("../..").JSX.Element;
        container: any;
        animate: boolean;
        destroyed: boolean;
        didMount(): void;
        didUpdate(): void;
        didUnmount(): void;
        setState(partialState: {}, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        setAnimate(animate: boolean): void;
        destroy(): void;
    };
};
export default _default;
