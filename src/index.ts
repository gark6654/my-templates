import { buildAppConfig, copyTemplate, updatePackageJson } from './helpers';

const initApp = async () => {
  try {
    const appConfig = await buildAppConfig();

    await copyTemplate(appConfig.template, appConfig.name);

    await updatePackageJson(appConfig.name, appConfig);

    console.log('App successfully initialized !');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

initApp().catch();
