import { Animation, EasingFunction, InterpolateFunction } from './interface';
declare class Animator {
    element: any;
    animation: Animation;
    isClip: boolean;
    easing: EasingFunction;
    duration: number;
    delay: number;
    property: string[];
    interpolates: InterpolateFunction[];
    totalDuration: number;
    onFrame?: any;
    end: boolean;
    constructor(element: any, animation: Animation);
    to(time: number): void;
    update(t: number, time: any): void;
    onEnd(): void;
}
export default Animator;
