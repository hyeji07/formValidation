export namespace BtnInterface {
  export interface ClickBtnInterface {
    text: string;
    onClick: () => void;
    className?: string;
  }

  export interface SubmitBtnInterface {
    text: string;
    className?: string;
  }
}
