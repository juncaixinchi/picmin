/// <reference types="react-scripts" />

declare module 'mozjpeg-js' {
    interface Options {
        /** Compression quality, in range 0 (worst) to 100 (perfect). */
        quality?: number;
    }

    interface Result {
        data: Buffer;
    }
    export function encode(buffer: Buffer, option: Options): Result
};