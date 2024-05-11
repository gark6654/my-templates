import path from 'node:path';
import fs from 'node:fs';
import fsPromise from 'node:fs/promises';
import url from 'node:url';
import prompts from 'prompts';

import { ETemplate, TAppConfig } from '../types';
import { TemplateChoices } from '../constants';

const isValidAppName = (appName: string): boolean => (
  /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(appName)
);

const isDirectoryExists = (path: string): boolean => {
  return fs.existsSync(path);
};

const getTemplatePath = (template: ETemplate): string => {
  const __filename = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, `../templates/${template}`);
};

export const buildAppConfig = async (): Promise<TAppConfig> => {
  return await prompts([
    {
      name: 'name',
      type: 'text',
      initial: 'my-app',
      message: 'Enter name:',
      validate: value => isValidAppName(value),
    },
    {
      type: 'select',
      name: 'template',
      message: 'Select template:',
      choices: TemplateChoices,
    },
    {
      type: 'text',
      name: 'version',
      message: 'Enter version:',
      initial: '1.0.0',
    },
  ]);
};

export const createDirectory = async (path: string) => {
  if (isDirectoryExists(path)) {
    throw new Error(`Directory ${path} already exist, please remove or rename it!`);
  }

  await fsPromise.mkdir(path);
};

export const copyTemplate = async (template: ETemplate, appName: string) => {
  const templatePath = getTemplatePath(template);

  await createDirectory(appName);

  await fsPromise.cp(templatePath, appName, { recursive: true });
};

export const updatePackageJson = async (appName: string, appConfig: TAppConfig) => {
  const packageJsonPath = path.join(appName, 'package.json');
  const packageJson = JSON.parse(await fsPromise.readFile(packageJsonPath, 'utf8'));
  packageJson['name'] = appConfig.name;
  packageJson['version'] = appConfig.version;

  await fsPromise.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
};
