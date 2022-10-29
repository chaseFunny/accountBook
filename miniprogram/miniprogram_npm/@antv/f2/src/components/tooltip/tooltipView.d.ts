import Component from '../../base/component';
import { Ref } from '../../types';
export default class TooltipView extends Component {
    rootRef: Ref;
    arrowRef: Ref;
    constructor(props: any);
    _position(): void;
    didMount(): void;
    didUpdate(): void;
    render(): import("../..").JSX.Element;
}
