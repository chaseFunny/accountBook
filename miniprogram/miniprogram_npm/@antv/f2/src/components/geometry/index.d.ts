import Selection, { SelectionState } from './selection';
import { Adjust } from '@antv/adjust';
import { GeomType, GeometryProps } from './interface';
import AttrController from '../../controller/attr';
import { AnimationCycle } from '../../canvas/animation/interface';
import { Scale } from '@antv/scale';
export interface AdjustProp {
    type: string;
    adjust: Adjust;
}
declare class Geometry<P extends GeometryProps = GeometryProps, S extends SelectionState = SelectionState> extends Selection<P, S> {
    isGeometry: boolean;
    geomType: GeomType;
    attrs: any;
    adjust: AdjustProp;
    dataArray: any;
    records: any[];
    mappedArray: any;
    justifyContent: boolean;
    startOnZero: boolean;
    connectNulls: boolean;
    sortable: boolean;
    attrController: AttrController;
    animation: AnimationCycle;
    getDefaultCfg(): {};
    constructor(props: P, context?: any);
    willReceiveProps(nextProps: any): void;
    willMount(): void;
    willUpdate(): void;
    didMount(): void;
    _createAttrs(): void;
    _getThemeAttrsRange(): {
        x: import("../../coord/types").Range;
        y: import("../../coord/types").Range;
        color: any;
        size: any;
        shape: any;
    };
    _adjustScales(): void;
    _groupData(data: any): any[];
    _saveOrigin(originData: any): any[];
    _numberic(data: any): void;
    _adjustData(records: any): any;
    _updateStackRange(field: any, scale: any, dataArray: any): void;
    _processData(): void;
    _sortData(records: any): void;
    _initEvent(): void;
    getY0Value(): any;
    _getShapeStyle(shape: any, origin: any): any;
    /**
     * 数据映射到视图属性核心逻辑
     * x、y 每个元素走 normalize 然后 convertPoint
     * color、size、shape
     *  如果是Linear，则每个元素 走 mapping
     *  如果是Category/Identity 则第一个元素走 mapping
     */
    _mapping(records: any): any;
    mapping(): any[];
    getClip(): {
        type: string;
        attrs: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
    };
    getAttr(attrName: string): any;
    getXScale(): Scale;
    getYScale(): Scale;
    _getXSnap(invertPointX: any): any;
    _getYSnapRecords(invertPointY: any, records: any): any;
    flatRecords(): any;
    getSnapRecords(point: any, inCoordRange?: any): any[];
    getLegendItems(): any;
}
export default Geometry;
