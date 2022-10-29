export const __esModule: boolean;
export default _default;
declare function _default(start: any, end: any): (t: any) => string;
declare namespace _default {
    export { rgbGamma as gamma };
}
export function rgbBasis(colors: any): (t: any) => string;
export function rgbBasisClosed(colors: any): (t: any) => string;
declare function rgbGamma(y: number): {
    (start: any, end: any): (t: any) => string;
    gamma: (y: number) => any;
};
