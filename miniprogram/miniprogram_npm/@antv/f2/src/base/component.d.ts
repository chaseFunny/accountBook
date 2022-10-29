import { JSX } from '../jsx/jsx-namespace';
import { px2hd } from '../util';
export interface ComponentContext {
    px2hd: typeof px2hd;
    [key: string]: any;
}
export interface IProps {
    zIndex?: number;
    [key: string]: any;
}
export interface Updater<S = any> {
    enqueueSetState: (component: Component, partialState: S, callback?: () => void) => void;
    enqueueForceUpdate: (component: Component, partialState: S, callback?: () => void) => void;
}
declare class Component<P extends IProps = any, S = any> {
    props: P;
    state: S;
    context: ComponentContext;
    refs: {
        [key: string]: Component;
    };
    updater: Updater<S>;
    children: JSX.Element;
    container: any;
    animate: boolean;
    destroyed: boolean;
    constructor(props: P, context?: ComponentContext, updater?: Updater<S>);
    willMount(): void;
    didMount(): void;
    willReceiveProps(_props: P, context?: P): void;
    willUpdate(): void;
    didUpdate(): void;
    render(): JSX.Element | null;
    didUnmount(): void;
    setState(partialState: S, callback?: () => void): void;
    forceUpdate(callback?: () => void): void;
    setAnimate(animate: boolean): void;
    destroy(): void;
}
export default Component;
