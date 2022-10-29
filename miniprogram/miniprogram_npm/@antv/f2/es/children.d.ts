export default Children;
declare namespace Children {
    export { cloneElement };
    export { map };
    export { toArray };
    export { compare };
}
declare function cloneElement(element: any, props: any): any;
declare function map(children: any, fn: any): any;
declare function toArray(element: any): any;
declare function compare(nextElement: any, lastElement: any, callback: any): void;
