export type Params = {
    file: File;
    progress: (progress: number) => void;
    libraryId: string;
    success: (
        res: {
            url: string;
            meta: {
                id: string;
                title: string;
                alt: string;
                loop: boolean;
                autoPlay: boolean;
                controls: boolean;
                poster: string;
            };
        }
    ) => void;
    error: (
        err: {
            msg: string;
        }
    ) => void;
}

export type uploadFn = (
    params: Params
) => void;
