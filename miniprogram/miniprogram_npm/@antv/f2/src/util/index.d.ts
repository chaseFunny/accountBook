declare function parsePadding(padding: number | number[]): number[];
declare type pxstr = `${number}px`;
declare function batch2hd(px2hd: any): (value: pxstr | pxstr[] | number | number[] | string | string[] | any) => any;
declare function extendMap(arr: any, fn: Function): any;
declare function toTimeStamp(value: any): any;
declare function isInBBox(bbox: any, point: any): boolean;
declare function getElementsByClassName(className: string, element: any): any[];
declare const px2hd: (value: pxstr | pxstr[] | number | number[] | string | string[] | any) => any;
export { px2hd, batch2hd, extendMap, parsePadding, toTimeStamp, isInBBox, getElementsByClassName };
