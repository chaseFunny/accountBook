declare type UpdateCallback = (time: number) => void;
declare type EndCallback = () => void;
declare class Timeline {
    playing: boolean;
    paused: boolean;
    pausedTime: number;
    duration: number;
    animationFrameNumber: any;
    onUpdate: UpdateCallback;
    onEnd: EndCallback;
    play(duration: number, onUpdate: UpdateCallback, onEnd: EndCallback): void;
    pause(): void;
    stop(): void;
    end(): void;
    abort(): void;
}
export default Timeline;
