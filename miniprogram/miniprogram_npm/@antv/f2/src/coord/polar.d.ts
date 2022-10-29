import Base from './base';
import { Option } from './types';
interface PolarOption extends Option {
    radius: number;
    innerRadius: number;
}
declare class Polar extends Base {
    type: string;
    isPolar: boolean;
    startAngle: number;
    endAngle: number;
    radius: number;
    innnerRadius: number;
    option: PolarOption;
    update(option: PolarOption): this;
    isCyclic(): boolean;
    convertPoint(point: any): {
        x: number;
        y: number;
    };
    invertPoint(point: any): {};
}
export default Polar;
