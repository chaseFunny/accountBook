import withPieLabel from './withPieLabel';
import PieLabelView from './pieLabeView';
export { PieLabelView, withPieLabel };
declare const _default: {
    new (props: any): {
        triggerRef: import("../../types").Ref;
        labels: [];
        willMount(): void;
        didMount(): void;
        getLabels(props: any): any[];
        _handleEvent: (ev: any) => void;
        _initEvent(): void;
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
