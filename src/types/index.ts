export enum ETemplate {
  REACT_TYPESCRIPT = 'react-typescript',
  NEXTJS_TYPESCRIPT = 'nextjs-typescript',
  NEXTJS_TYPESCRIPT_STYLED_COMPONENTS = 'nextjs-typescript-styled-components',
}

export type TAppConfig = {
  name: string;
  version: string;
  template: ETemplate;
};

export type TTemplateConfig = {
  name: ETemplate;
  version: string;
};

export type TPromptData = {
  name: string;
  version: string;
  template: ETemplate;
};

export type TChoice = {
  title: string;
  value: string;
};
