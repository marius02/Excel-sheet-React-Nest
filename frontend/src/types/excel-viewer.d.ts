import { Ref } from "react";

declare module 'excel-viewer' {
    interface ExcelViewerOptions {
        // Define any options you are using
        [key: string]: unknown;
    }

    class ExcelViewer {
        constructor(el: Ref, url: string, opts?: ExcelViewerOptions | undefined);

        // Add any methods you want to define
        init(): void;
    }

    export = ExcelViewer;
}