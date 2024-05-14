import process from 'node:process';
import { ETemplate, TAppConfig } from './types';
import { buildAppConfig, copyTemplate, generateTemplateConfig, updatePackageJson } from './helpers';

const initApp = async () => {
  try {
    const [, , appName] = process.argv;

    const initial: TAppConfig = {
      name: appName,
      version: '1.0.0',
      template: ETemplate.REACT_TYPESCRIPT,
    };

    const appConfig = await buildAppConfig(initial);

    const templateConfig = generateTemplateConfig(appConfig.template, '0.0.1');

    await copyTemplate(appConfig.name, templateConfig);

    await updatePackageJson(appConfig.name, appConfig);

    console.log('App successfully initialized !');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

initApp().catch();
