import { Style } from '../../../types';
declare type PointGuideProps = {
    style?: Style;
    offsetX?: number;
    offsetY?: number;
    points?: {
        x: number;
        y: number;
    }[] | null;
    theme?: any;
};
declare const _default: (props: PointGuideProps, context: any) => import("../../..").JSX.Element;
export default _default;
