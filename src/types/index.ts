export enum ETemplate {
  REACT_TYPESCRIPT = 'react-typescript',
  NEXTJS_TYPESCRIPT = 'nextjs-typescript',
  NEXTJS_TYPESCRIPT_STYLED_COMPONENTS = 'nextjs-typescript-styled-components',
}

export type TAppConfig = {
  name: string;
  template: ETemplate;
};

export type TChoice = {
  title: string;
  value: string;
};
