import withSunburst from './withSunburst';
import SunburstView from './sunburstView';
import IcicleView from './icicleView';
export { withSunburst, SunburstView, IcicleView };
declare const _default: {
    new (props: any, context: any): {
        coordController: import("../../controller/coord").default;
        coord: import("../../coord/base").default;
        color: import("../../attr/category").default;
        triggerRef: import("../../types").Ref[];
        didMount(): void;
        _mapping(children: any): void;
        sunburst(): any;
        render(): import("../..").JSX.Element;
        props: any;
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
        willMount(): void;
        willReceiveProps(_props: any, context?: any): void;
        willUpdate(): void;
        didUpdate(): void;
        didUnmount(): void;
        setState(partialState: any, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        setAnimate(animate: boolean): void;
        destroy(): void;
    };
};
export default _default;
