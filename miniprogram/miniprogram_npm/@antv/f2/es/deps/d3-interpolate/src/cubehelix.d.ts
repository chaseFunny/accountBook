declare function _default(start: any, end: any): (t: any) => string;
declare namespace _default {
    export { cubehelixGamma as gamma };
}
export default _default;
export function cubehelixLong(start: any, end: any): (t: any) => string;
export namespace cubehelixLong { }
declare function cubehelixGamma(y: number): {
    (start: any, end: any): (t: any) => string;
    gamma: (y: number) => any;
};
