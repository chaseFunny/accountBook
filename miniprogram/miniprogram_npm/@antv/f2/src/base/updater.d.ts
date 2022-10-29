declare function createUpdater(canvas: any): {
    enqueueForceUpdate: (component: any, state: any, callback?: () => void) => void;
    enqueueSetState: (component: any, state: any, callback?: () => void) => void;
};
export { createUpdater };
