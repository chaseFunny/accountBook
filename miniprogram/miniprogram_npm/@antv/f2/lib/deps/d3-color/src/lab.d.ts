export const __esModule: boolean;
export default lab;
export function Hcl(h: any, c: any, l: any, opacity: any): void;
export class Hcl {
    constructor(h: any, c: any, l: any, opacity: any);
    h: number;
    c: number;
    l: number;
    opacity: number;
}
export function Lab(l: any, a: any, b: any, opacity: any): void;
export class Lab {
    constructor(l: any, a: any, b: any, opacity: any);
    l: number;
    a: number;
    b: number;
    opacity: number;
}
declare function lab(l: any, a: any, b: any, opacity: any, ...args: any[]): Lab;
export function gray(l: any, opacity: any): Lab;
export function hcl(h: any, c: any, l: any, opacity: any, ...args: any[]): Hcl;
export function lch(l: any, c: any, h: any, opacity: any, ...args: any[]): Hcl;
