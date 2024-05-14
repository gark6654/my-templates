import { ETemplate, TChoice } from '../types';

// template choices for prompts
export const TemplateChoices: TChoice[] = [
  { title: 'React + TypeScript', value: ETemplate.REACT_TYPESCRIPT },
  { title: 'NextJS + TypeScript', value: ETemplate.NEXTJS_TYPESCRIPT },
  { title: 'NextJS + TypeScript + styled-components', value: ETemplate.NEXTJS_TYPESCRIPT_STYLED_COMPONENTS },
];
