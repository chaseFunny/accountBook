import { JSX } from './jsx/jsx-namespace';
declare function cloneElement(element: any, props: any): any;
declare function map(children: any, fn: any): any;
declare function compare(nextElement: JSX.Element, lastElement: JSX.Element, callback: Function): void;
declare function toArray(element: JSX.Element): JSX.Element[] | null;
declare const Children: {
    cloneElement: typeof cloneElement;
    map: typeof map;
    toArray: typeof toArray;
    compare: typeof compare;
};
export default Children;
