import { JSX as JSXNamespace } from './jsx-namespace';
import { ElementType } from '../types';
export declare namespace jsx {
    namespace JSX {
        type Element = JSXNamespace.Element;
        type ElementClass = JSXNamespace.ElementClass;
        type IntrinsicElements = JSXNamespace.IntrinsicElements;
    }
}
export declare function jsx(type: ElementType, config: any, ...children: any[]): JSXNamespace.Element;
