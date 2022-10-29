interface LayoutProps {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
}
interface Style {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
}
declare class Layout {
    left: number;
    top: number;
    width: number;
    height: number;
    right: number;
    bottom: number;
    constructor(layout: LayoutProps);
    update(layout: LayoutProps): this;
    padding(style: Style): this;
    clone(): Layout;
    static fromStyle(style: any): Layout;
}
export default Layout;
export { LayoutProps };
