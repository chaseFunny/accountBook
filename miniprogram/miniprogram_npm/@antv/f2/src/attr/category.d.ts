import { Category as CategoryScale, ScaleConfig } from '@antv/scale';
import Base from './base';
declare class Category extends Base {
    createScale(scaleConfig: ScaleConfig): CategoryScale;
    _mapping(value: any): string | number;
}
export default Category;
