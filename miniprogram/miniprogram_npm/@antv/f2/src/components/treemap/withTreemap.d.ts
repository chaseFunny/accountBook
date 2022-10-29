import { Category } from '../../attr';
import Component from '../../base/component';
import CoordController from '../../controller/coord';
import Coord from '../../coord';
import { Ref } from '../../types';
declare const _default: (View: any) => {
    new (props: any, context: any, updater?: any): {
        coordController: CoordController;
        coord: Coord;
        color: Category;
        triggerRef: Ref[];
        treemapLayout(): any;
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
        willMount(): void;
        didMount(): void;
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
