import Component from './base/component';
declare class Timeline extends Component {
    index: number;
    delay: number;
    constructor(props: any);
    didMount(): void;
    didUnmount(): void;
    next: () => void;
    render(): import(".").JSX.Element;
}
export default Timeline;
