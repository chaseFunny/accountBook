import { Style } from '../../../types';
declare type TextGuideProps = {
    points?: {
        x: number;
        y: number;
    }[] | null;
    content: string | number;
    style?: Style;
    offsetX?: number;
    offsetY?: number;
    theme?: any;
};
declare const _default: (props: TextGuideProps, context: any) => import("../../..").JSX.Element;
export default _default;
