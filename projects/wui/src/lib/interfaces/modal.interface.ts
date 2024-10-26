export interface ModalInterface {
    zIndex: number;
    show: boolean;
    showBackdrop: boolean;
    open(): Promise<void>;
    openService(zIndex: number): Promise<void>;
    close();
    closeService(): Promise<void>;
}