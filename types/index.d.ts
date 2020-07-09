export declare function call<P extends {
    [key: string]: any;
}>(methodName: string, params: P, callback?: (resultMap: P) => void): void;
