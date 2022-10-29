import type { Types } from '@antv/f2-graphic';
interface TagGuideProps {
    points?: {
        x: number;
        y: number;
    }[] | null;
    canvasWidth?: number;
    canvasHeight?: number;
    guideBBox?: Types.BBox;
    offsetX?: number;
    offsetY?: number;
    autoAdjust?: boolean;
    /**
     * 箭头的方向
     */
    direct?: string;
    /**
     * 箭头的边长
     */
    side?: number;
    /**
     * 文字内容
     */
    content?: string;
    /**
     * 背景样式设置，见 group 绘图属性
     */
    background?: any;
    /**
     * 文字样式
     */
    textStyle?: any;
    /**
     * tagGuide ref
     */
    triggerRef?: any;
}
declare const _default: (props: TagGuideProps, context: any) => import("../../..").JSX.Element;
export default _default;
