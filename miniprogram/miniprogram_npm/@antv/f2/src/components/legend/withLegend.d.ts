import Component from '../../base/component';
import Chart from '../../chart';
import { Style, TextAttrs } from '../../types';
interface LegendItem {
    /**
     * 标记颜色。
     */
    color: string;
    /**
     * 名称。
     */
    name: string;
    /**
     * 值。
     */
    value?: string | number;
    /**
     * 图例标记。
     */
    marker?: string;
}
export interface LegendProps {
    /**
     * 图表。
     */
    readonly chart?: Chart;
    /**
     * 图例的显示位置。默认为 top。
     */
    position?: 'right' | 'left' | 'top' | 'bottom';
    /**
     * 图例宽度
     */
    width?: number | string;
    /**
     * 图例高度
     */
    height?: number | string;
    /**
     * legend 和图表内容的间距
     */
    margin?: number | string;
    /**
     * 回调函数，用于格式化图例每项的文本显示。
     */
    itemFormatter?: (value: string, name: string) => string;
    /**
     * 图例项列表。
     */
    items?: LegendItem[];
    /**
     * 图例样式。
     */
    style?: Style;
    /**
     * 图例标记。
     */
    marker?: 'circle' | 'square' | 'line';
    /**
     * 用于设置图例项的样式
     */
    itemStyle?: Style;
    /**
     * 用于设置图例项的文本样式
     */
    nameStyle?: TextAttrs;
    /**
     * 用于设置图例项的文本样式
     */
    valueStyle?: TextAttrs;
    /**
     * value展示文案的前缀
     */
    valuePrefix?: string;
    /**
     * 是否可点击
     */
    clickable?: boolean;
    onClick?: (item: LegendItem) => void;
}
declare const _default: (View: any) => {
    new (props: any): {
        style: Style;
        itemWidth: Number;
        getOriginItems(): any;
        getItems(): any;
        setItems(items: any): void;
        getMaxItemBox(legendShape: any): {
            width: number;
            height: number;
        };
        _init(): void;
        updateCoord(): void;
        willMount(): void;
        didMount(): void;
        willUpdate(): void;
        _initEvent(): void;
        render(): import("../..").JSX.Element;
        props: LegendProps;
        state: any;
        context: import("../../base/component").ComponentContext;
        refs: {
            [key: string]: Component<any, any>;
        };
        updater: import("../../base/component").Updater<any>;
        children: import("../..").JSX.Element; /**
         * 图例宽度
         */
        container: any;
        /**
         * 图例高度
         */
        animate: boolean;
        destroyed: boolean;
        willReceiveProps(_props: LegendProps, context?: LegendProps): void;
        didUpdate(): void;
        didUnmount(): void;
        setState(partialState: any, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        setAnimate(animate: boolean): void;
        destroy(): void;
    };
};
export default _default;
