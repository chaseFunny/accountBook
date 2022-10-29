import { Identity as IdentityScale, ScaleConfig } from '@antv/scale';
import Base from './base';
declare class Identity extends Base {
    createScale(scaleConfig: ScaleConfig): IdentityScale;
    _mapping(): string | number;
}
export default Identity;
