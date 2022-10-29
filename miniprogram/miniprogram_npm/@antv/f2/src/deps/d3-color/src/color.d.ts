export function Color(): void;
export default function color(format: any): Hsl | Rgb;
export function rgbConvert(o: any): Rgb;
export function rgb(r: any, g: any, b: any, opacity: any, ...args: any[]): Rgb;
export function Rgb(r: any, g: any, b: any, opacity: any): void;
export class Rgb {
    constructor(r: any, g: any, b: any, opacity: any);
    r: number;
    g: number;
    b: number;
    opacity: number;
}
export function hslConvert(o: any): Hsl;
export function hsl(h: any, s: any, l: any, opacity: any, ...args: any[]): Hsl;
export const darker: number;
export const brighter: number;
declare function Hsl(h: any, s: any, l: any, opacity: any): void;
declare class Hsl {
    constructor(h: any, s: any, l: any, opacity: any);
    h: number;
    s: number;
    l: number;
    opacity: number;
}
export {};
