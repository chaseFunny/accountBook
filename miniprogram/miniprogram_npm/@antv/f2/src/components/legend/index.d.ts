import withLegend from './withLegend';
import LegendView from './legendView';
export { withLegend, LegendView };
declare const _default: {
    new (props: any): {
        style: import("../../types").Style;
        itemWidth: Number;
        getOriginItems(): any;
        getItems(): any;
        setItems(items: any): void;
        getMaxItemBox(legendShape: any): {
            width: number;
            height: number;
        };
        _init(): void;
        updateCoord(): void;
        willMount(): void;
        didMount(): void;
        willUpdate(): void;
        _initEvent(): void;
        render(): import("../..").JSX.Element;
        props: import("./withLegend").LegendProps;
        state: any;
        context: import("../../base/component").ComponentContext;
        refs: {
            [key: string]: import("../../base/component").default<any, any>;
        };
        updater: import("../../base/component").Updater<any>;
        children: import("../..").JSX.Element;
        container: any;
        animate: boolean;
        destroyed: boolean;
        willReceiveProps(_props: import("./withLegend").LegendProps, context?: import("./withLegend").LegendProps): void;
        didUpdate(): void;
        didUnmount(): void;
        setState(partialState: any, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        setAnimate(animate: boolean): void;
        destroy(): void;
    };
};
export default _default;
