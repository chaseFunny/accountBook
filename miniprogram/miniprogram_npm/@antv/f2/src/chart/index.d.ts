import { JSX } from '../jsx/jsx-namespace';
import { ScaleConfig } from '@antv/scale';
import Component from '../base/component';
import Layout from '../base/layout';
import Coord from '../coord';
import ScaleController from '../controller/scale';
interface Point {
    x: number;
    y: number;
}
export interface Props {
    zIndex?: number;
    data: any;
    scale?: any;
    coord?: any;
    start?: Point;
    end?: Point;
    children: any;
}
export interface ChartChildProps {
    data?: any;
    chart?: Chart;
    coord?: Coord;
    layout?: Layout;
    [k: string]: any;
}
interface IChart {
    props: Props;
}
export interface PositionLayout {
    position: 'top' | 'right' | 'bottom' | 'left';
    width: number;
    height: number;
}
export interface ComponentPosition {
    component: Component;
    layout: PositionLayout | PositionLayout[];
}
declare class Chart extends Component implements IChart {
    data: any;
    private layout;
    private coord;
    private componentsPosition;
    private layoutController;
    private coordController;
    private scaleController;
    scale: ScaleController;
    constructor(props: any, context?: any, updater?: any);
    willReceiveProps(nextProps: any, context: any): void;
    willUpdate(): void;
    private getStyle;
    layoutCoord(layout: PositionLayout): void;
    resetCoordLayout(): void;
    updateCoordLayout(layout: PositionLayout | PositionLayout[]): void;
    updateCoordFor(component: Component, layout: PositionLayout | PositionLayout[]): void;
    getGeometrys(): Component<any, any>[];
    /**
     * calculate dataset's position on canvas
     * @param  {Object} record the dataset
     * @return {Object} return the position
     */
    getPosition(record: any): {
        x: any;
        y: any;
    };
    getSnapRecords(point: any, inCoordRange?: any): any;
    getLegendItems(point?: any): any;
    setScale(field: string, option: ScaleConfig): void;
    getScale(field: string): import("@antv/scale").Scale;
    getScales(): {
        [field: string]: import("@antv/scale").Scale;
    };
    getXScales(): any[];
    getYScales(): any[];
    getCoord(): Coord;
    filter(field: string, condition: any): void;
    _getRenderData(): any;
    render(): JSX.Element;
}
export default Chart;
