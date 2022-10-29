import Timeline from './timelime';
import Animator from './animator';
import { Canvas } from '@antv/f2-graphic';
declare class Animation {
    timeline: Timeline;
    canvas: Canvas;
    constructor(canvas: any);
    createAnimator(element: any, animation: any): Animator;
    play(container: any, onAnimationEnd?: any): void;
    end(): void;
    abort(): void;
}
export default Animation;
