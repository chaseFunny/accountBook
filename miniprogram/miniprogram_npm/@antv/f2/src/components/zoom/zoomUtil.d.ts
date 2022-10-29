import { ZoomRange } from './index';
import { Scale } from '@antv/scale';
declare function updateRange(scale: Scale, originScale: Scale, range: ZoomRange): void | Scale;
declare function updateFollow(scales: Scale[], mainScale: Scale, data: any): void[];
export { updateRange, updateFollow };
