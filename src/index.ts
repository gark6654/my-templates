import { buildAppConfig } from './helpers';

const initApp = async () => {
  try {
    const appConfig = await buildAppConfig();

    console.log(JSON.stringify(appConfig));
  } catch (e) {
    console.error(e);
  }
};

initApp().catch();
