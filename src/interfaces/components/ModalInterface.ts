export namespace ModalInterface {
  export interface CustomModalInterface {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
  }
}
