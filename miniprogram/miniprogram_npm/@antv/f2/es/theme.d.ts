export default Theme;
declare namespace Theme {
    export const fontFamily: string;
    export const pixelRatio: number;
    export const padding: number[];
    export { chart };
    export const colors: string[];
    export namespace shapes {
        const line: string[];
        const point: string[];
        const area: string[];
        const interval: string[];
    }
    export const sizes: string[];
    export namespace shape {
        export namespace line_1 {
            namespace _default {
                const lineWidth: string;
                const lineJoin: string;
                const lineCap: string;
            }
            export { _default as default };
            export namespace smooth {
                const smooth_1: boolean;
                export { smooth_1 as smooth };
            }
            export namespace dash {
                const lineDash: string[];
            }
        }
        export { line_1 as line };
        export namespace point_1 {
            namespace _default_1 {
                const size: string;
            }
            export { _default_1 as default };
            export namespace hollowCircle {
                const lineWidth_1: string;
                export { lineWidth_1 as lineWidth };
            }
        }
        export { point_1 as point };
        export namespace area_1 {
            namespace _default_2 {
                const fillOpacity: number;
            }
            export { _default_2 as default };
        }
        export { area_1 as area };
        export namespace interval_1 {
            const _default_3: {};
            export { _default_3 as default };
        }
        export { interval_1 as interval };
    }
    export { axis };
    export { guide };
}
declare namespace chart {
    const padding_1: string[];
    export { padding_1 as padding };
}
declare namespace axis {
    export const labelOffset: string;
    export namespace line_2 {
        export const stroke: string;
        const lineWidth_2: string;
        export { lineWidth_2 as lineWidth };
    }
    export { line_2 as line };
    export namespace label {
        const fill: string;
        const fontSize: string;
    }
    export namespace grid {
        const stroke_1: string;
        export { stroke_1 as stroke };
        const lineWidth_3: string;
        export { lineWidth_3 as lineWidth };
        const lineDash_1: string[];
        export { lineDash_1 as lineDash };
    }
}
declare namespace guide {
    export namespace line_3 {
        namespace style {
            const stroke_2: string;
            export { stroke_2 as stroke };
            const lineWidth_4: number;
            export { lineWidth_4 as lineWidth };
        }
        const offsetX: number;
        const offsetY: number;
    }
    export { line_3 as line };
    export namespace text {
        export namespace style_1 {
            const fill_1: string;
            export { fill_1 as fill };
            export const textBaseline: string;
        }
        export { style_1 as style };
        const offsetX_1: number;
        export { offsetX_1 as offsetX };
        const offsetY_1: number;
        export { offsetY_1 as offsetY };
    }
    export namespace rect {
        export namespace style_2 {
            const fill_2: string;
            export { fill_2 as fill };
        }
        export { style_2 as style };
    }
    export namespace arc {
        export namespace style_3 {
            const stroke_3: string;
            export { stroke_3 as stroke };
        }
        export { style_3 as style };
    }
    export namespace html {
        const offsetX_2: number;
        export { offsetX_2 as offsetX };
        const offsetY_2: number;
        export { offsetY_2 as offsetY };
        export const alignX: string;
        export const alignY: string;
    }
    export namespace tag {
        const offsetX_3: number;
        export { offsetX_3 as offsetX };
        const offsetY_3: number;
        export { offsetY_3 as offsetY };
        export const side: number;
        export namespace background {
            const padding_2: number;
            export { padding_2 as padding };
            export const radius: number;
            const fill_3: string;
            export { fill_3 as fill };
        }
        export namespace textStyle {
            const fontSize_1: number;
            export { fontSize_1 as fontSize };
            const fill_4: string;
            export { fill_4 as fill };
            export const textAlign: string;
            const textBaseline_1: string;
            export { textBaseline_1 as textBaseline };
        }
    }
    export namespace point_2 {
        const offsetX_4: number;
        export { offsetX_4 as offsetX };
        const offsetY_4: number;
        export { offsetY_4 as offsetY };
        export namespace style_4 {
            const fill_5: string;
            export { fill_5 as fill };
            export const r: number;
            const lineWidth_5: number;
            export { lineWidth_5 as lineWidth };
            const stroke_4: string;
            export { stroke_4 as stroke };
        }
        export { style_4 as style };
    }
    export { point_2 as point };
}
