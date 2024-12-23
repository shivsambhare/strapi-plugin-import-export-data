import { PLUGIN_ID } from '../../../constants';

const controller = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin(PLUGIN_ID)
      // the name of the service file & the method.
      .service('service')
      .getWelcomeMessage();
  },
  getCollections(ctx) {
    return strapi.plugin(PLUGIN_ID)
      // the name of the service file & the method.
      .service('service')
      .getCollections(ctx);
  },
  importData(ctx) {
    return strapi.plugin(PLUGIN_ID)
      // the name of the service file & the method.
      .service('service')
      .getImportData(ctx);
  },
  exportData(ctx) {
    return strapi.plugin(PLUGIN_ID)
      // the name of the service file & the method.
      .service('service')
      .getExportData(ctx);
  }
});

export default controller;
