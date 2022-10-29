import { Style } from '../../../types';
declare type ImageGuideProps = {
    src: string;
    points?: {
        x: number;
        y: number;
    }[] | null;
    attrs?: any;
    style?: Style;
    offsetX?: number;
    offsetY?: number;
};
declare const _default: (props: ImageGuideProps, context: any) => import("../../..").JSX.Element;
export default _default;
