declare const Theme: {
    fontFamily: string;
    pixelRatio: number;
    padding: number[];
    chart: {
        padding: string[];
    };
    colors: string[];
    shapes: {
        line: string[];
        point: string[];
        area: string[];
        interval: string[];
    };
    sizes: string[];
    shape: {
        line: {
            default: {
                lineWidth: string;
                lineJoin: string;
                lineCap: string;
            };
            smooth: {
                smooth: boolean;
            };
            dash: {
                lineDash: string[];
            };
        };
        point: {
            default: {
                size: string;
            };
            hollowCircle: {
                lineWidth: string;
            };
        };
        area: {
            default: {
                fillOpacity: number;
            };
        };
        interval: {
            default: {};
        };
    };
    axis: {
        labelOffset: string;
        line: {
            stroke: string;
            lineWidth: string;
        };
        label: {
            fill: string;
            fontSize: string;
        };
        grid: {
            stroke: string;
            lineWidth: string;
            lineDash: string[];
        };
    };
    guide: {
        line: {
            style: {
                stroke: string;
                lineWidth: number;
            };
            offsetX: number;
            offsetY: number;
        };
        text: {
            style: {
                fill: string;
                textBaseline: string;
            };
            offsetX: number;
            offsetY: number;
        };
        rect: {
            style: {
                fill: string;
            };
        };
        arc: {
            style: {
                stroke: string;
            };
        };
        html: {
            offsetX: number;
            offsetY: number;
            alignX: string;
            alignY: string;
        };
        tag: {
            offsetX: number;
            offsetY: number;
            side: number;
            background: {
                padding: number;
                radius: number;
                fill: string;
            };
            textStyle: {
                fontSize: number;
                fill: string;
                textAlign: string;
                textBaseline: string;
            };
        };
        point: {
            offsetX: number;
            offsetY: number;
            style: {
                fill: string;
                r: number;
                lineWidth: number;
                stroke: string;
            };
        };
    };
};
export default Theme;
