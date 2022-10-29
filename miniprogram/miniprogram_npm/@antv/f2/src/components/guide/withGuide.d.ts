import Component from '../../base/component';
import { Ref } from '../../types';
import Chart from '../../chart';
declare const _default: (View: any) => {
    new (props: any): {
        chart: Chart;
        triggerRef: Ref;
        willMount(): void;
        didMount(): void;
        didUpdate(): void;
        getGuideBBox(): void;
        parseReplaceStr(value: any, scale: any): any;
        parsePoint(record: any): any;
        convertPoints(records: any): any;
        getGuideTheme(): any;
        render(): import("../..").JSX.Element;
        props: any;
        state: any;
        context: import("../../base/component").ComponentContext;
        refs: {
            [key: string]: Component<any, any>;
        };
        updater: import("../../base/component").Updater<any>;
        children: import("../..").JSX.Element;
        container: any;
        animate: boolean;
        destroyed: boolean;
        willReceiveProps(_props: any, context?: any): void;
        willUpdate(): void;
        didUnmount(): void;
        setState(partialState: any, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        setAnimate(animate: boolean): void;
        destroy(): void;
    };
};
export default _default;
