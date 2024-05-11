import prompts from 'prompts';

import { TAppConfig } from '../types';
import { TemplateChoices } from '../constants';

export const isValidAppName = (appName: string): boolean => (
  /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(appName)
);

export const buildAppConfig = async (): Promise<TAppConfig> => {
  return await prompts([
    {
      name: 'name',
      type: 'text',
      initial: 'my-app',
      message: 'Enter App name:',
      validate: value => isValidAppName(value),
    },
    {
      type: 'select',
      name: 'template',
      message: 'Select App template',
      choices: TemplateChoices,
    },
  ]);
};
