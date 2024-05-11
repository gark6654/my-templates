import { buildAppConfig, copyTemplate } from './helpers';

const initApp = async () => {
  try {
    const appConfig = await buildAppConfig();

    await copyTemplate(appConfig.template, appConfig.name);

    console.log('App successfully initialized !');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

initApp().catch();
