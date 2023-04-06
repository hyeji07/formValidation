export namespace FormInterface {
  export interface InputInterface {
    title: string;
    type: string;
    value: string | number | undefined;
    name: string;
    placeholder: string;
    InputTitle?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
  }

  //InputLoginOnchangeRegex 의 경우
  export interface InputRegexInterface {
    title: string;
    type: string;
    value: string | number | undefined;
    name: string;
    placeholder: string;
    InputTitle?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    maxValue?: number;
    regexCheck: any; //임시
    defaultText: string;
    successText: string;
    errorText: string;
  }

  export interface TextAreaInterface {
    InputTitle: string;
    labelClassName?: string;
    title: string;
    value: string | number | undefined;
    name: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
  }
}
