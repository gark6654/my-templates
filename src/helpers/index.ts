import path from 'node:path';
import fs from 'node:fs';
import fsPromise from 'node:fs/promises';
import url from 'node:url';
import prompts from 'prompts';

import { ETemplate, TAppConfig, TPromptData } from '../types';
import { TemplateChoices } from '../constants';

// check if app name is valid
const isValidAppName = (appName: string): boolean => (
  /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(appName)
);

// check if directory exists
const isDirectoryExists = (path: string): boolean => {
  return fs.existsSync(path);
};

// todo => set up versioning
// get path to template directory
const getTemplatePath = (template: ETemplate): string => {
  const __filename = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, `../templates/${template}`);
};

// prompt user for app name, template and version
export const promptUser = async (initial: TPromptData): Promise<TPromptData> => {
  const { name, version } = initial;

  return await prompts([
    {
      name: 'name',
      type: 'text',
      initial: name,
      message: 'Enter name:',
      validate: value => isValidAppName(value),
    },
    {
      type: 'select',
      name: 'template',
      choices: TemplateChoices,
      message: 'Select template:',
    },
    {
      type: 'text',
      name: 'version',
      message: 'Enter version:',
      initial: version,
    },
  ]);
};

// build app config from user input
export const buildAppConfig = async (initialConfig: TAppConfig): Promise<TAppConfig> => {
  const promptData = await promptUser(initialConfig);

  Object.entries(promptData).forEach(([key, value]) => {
    // todo => fix types...
    // @ts-ignore
    initialConfig[key] = value;
  });

  return initialConfig;
};

// create new directory for app
export const createDirectory = async (path: string) => {
  if (isDirectoryExists(path)) {
    throw new Error(`Directory ${path} already exist, please remove or rename it!`);
  }

  await fsPromise.mkdir(path);
};

// copy files from template to new app directory
export const copyTemplate = async (template: ETemplate, appName: string) => {
  const templatePath = getTemplatePath(template);

  await createDirectory(appName);

  await fsPromise.cp(templatePath, appName, { recursive: true });
};

// write package.json with app name and version from prompts
export const updatePackageJson = async (appName: string, appConfig: TAppConfig) => {
  const packageJsonPath = path.join(appName, 'package.json');
  const packageJson = JSON.parse(await fsPromise.readFile(packageJsonPath, 'utf8'));
  packageJson['name'] = appConfig.name;
  packageJson['version'] = appConfig.version;

  await fsPromise.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
};
