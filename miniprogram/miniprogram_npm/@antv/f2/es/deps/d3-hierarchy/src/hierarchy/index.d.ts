declare function hierarchy(data: any, children: any): any;
export default hierarchy;
export function computeHeight(node: any): void;
export function Node(data: any): void;
export class Node {
    constructor(data: any);
    data: any;
    depth: number;
    height: number;
    parent: any;
}
