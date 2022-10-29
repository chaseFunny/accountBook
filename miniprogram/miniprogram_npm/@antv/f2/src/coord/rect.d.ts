import Base from './base';
import { Option } from './types';
declare class Rect extends Base {
    type: string;
    update(option: Option): this;
}
export default Rect;
