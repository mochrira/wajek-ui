export interface ModalInterface {
    zIndex: number;
    show: boolean;
    showBackdrop: boolean;
    open(): Promise<void>;
    openService(zIndex: number): Promise<void>;
    close(): Promise<void>;
    closeService(): Promise<void>;
}