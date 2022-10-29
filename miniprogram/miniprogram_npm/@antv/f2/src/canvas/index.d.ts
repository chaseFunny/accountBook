import { Canvas as GCanvas } from '@antv/f2-graphic';
import Component from '../base/component';
import Layout from '../base/layout';
import Animation from './animation';
export interface ChartProps {
    context?: CanvasRenderingContext2D;
    pixelRatio?: number;
    width?: number | string;
    height?: number | string;
    padding?: number | string | (number | string)[];
    animate?: boolean;
    children?: any;
    px2hd?: any;
    theme?: any;
    style?: any;
    createImage?: () => HTMLImageElement;
    /**
     * 是否横屏
     */
    landscape?: boolean;
}
declare class Canvas extends Component<ChartProps> {
    canvas: GCanvas;
    container: GCanvas;
    animation?: Animation;
    layout: Layout;
    theme: any;
    private _ee;
    constructor(props: ChartProps);
    renderComponents(components: Component[]): void;
    update(nextProps: ChartProps): void;
    resize(width?: any, height?: any): void;
    updateLayout(props: any): void;
    draw(): void;
    play(): void;
    render(): any;
    destroy(): void;
    on(type: string, listener: any): void;
    emit(type: string, event?: any): void;
    off(type: string, listener?: any): void;
}
export default Canvas;
