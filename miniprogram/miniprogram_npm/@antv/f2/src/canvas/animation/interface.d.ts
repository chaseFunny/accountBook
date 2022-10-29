export declare type EasingFunction = (t: number) => number;
export declare type InterpolateFunction = (t: number) => any;
export interface Animation {
    easing?: string | EasingFunction;
    duration: number;
    delay?: number;
    property?: string[];
    isClip?: boolean;
    start?: any;
    end?: any;
    onFrame?: any;
    onEnd?: any;
}
/**
 * 动画生命周期
 */
export interface AnimationCycle {
    appear?: Animation;
    update?: Animation;
    destroy?: Animation;
}
