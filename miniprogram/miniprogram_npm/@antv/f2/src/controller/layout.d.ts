import Layout from '../base/layout';
interface Style {
    left: number;
    top: number;
    width: number;
    height: number;
    padding: number[];
}
declare class LayoutController {
    private layout;
    private getRectRange;
    create(style: Style): Layout;
    update(style: Style): Layout;
}
export default LayoutController;
