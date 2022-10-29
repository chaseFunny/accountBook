import { JSX } from '../jsx/jsx-namespace';
import Component from './component';
declare function renderShape(component: Component, children: JSX.Element, animate?: boolean): any;
declare function renderComponent(component: Component | Component[]): void;
declare function destroyElement(elements: JSX.Element): void;
declare function diff(parent: Component, nextChildren: any, lastChildren: any): any;
declare function renderChildren(parent: Component, nextChildren: any, lastChildren: any): any;
export { renderChildren, diff, renderComponent, renderShape, destroyElement };
