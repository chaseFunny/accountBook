import Component from '../../base/component';
import { ShapeAttrs, Point } from '../../types';
declare type StyleType = (record: any) => ShapeAttrs;
export interface SelectionProps {
    selection?: {
        triggerOn?: 'click' | 'press' | string;
        type?: 'single' | 'multiple';
        defaultSelected?: any[];
        selectedStyle?: ShapeAttrs | StyleType;
        unSelectedStyle?: ShapeAttrs | StyleType;
        cancelable?: boolean;
    };
    [k: string]: any;
}
export interface SelectionState {
    selected: any[];
}
declare class Selection<P extends SelectionProps = SelectionProps, S extends SelectionState = SelectionState> extends Component<P, S> {
    constructor(props: P, context: any);
    didMount(): void;
    willReceiveProps(nextProps: P): void;
    getSnapRecords(_point: Point): any;
    isSelected(record: any): boolean;
    getSelectionStyle(record: any): ShapeAttrs;
}
export default Selection;
