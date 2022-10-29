import { Style } from '../../../types';
declare type LineGuideProps = {
    points?: {
        x: number;
        y: number;
    }[] | null;
    style?: Style;
    offsetX?: number | number[];
    offsetY?: number | number[];
    theme?: any;
};
declare const _default: (props: LineGuideProps, context: any) => import("../../..").JSX.Element;
export default _default;
