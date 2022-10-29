import withTooltip, { TooltipProps } from './withTooltip';
import TooltipView from './tooltipView';
export { TooltipProps, withTooltip, TooltipView };
declare const _default: {
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
        state: import("./withTooltip").TooltipState;
        context: import("../../base/component").ComponentContext;
        refs: {
            [key: string]: import("../../base/component").default<any, any>;
        };
        updater: import("../../base/component").Updater<import("./withTooltip").TooltipState>;
        children: import("../..").JSX.Element;
        container: any;
        animate: boolean;
        destroyed: boolean;
        willUpdate(): void;
        didUpdate(): void;
        setState(partialState: import("./withTooltip").TooltipState, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        setAnimate(animate: boolean): void;
        destroy(): void;
    };
};
export default _default;
