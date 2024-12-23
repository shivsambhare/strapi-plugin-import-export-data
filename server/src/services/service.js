import { getCollectionsList, importData } from './import-export/import'
import { exportData } from './import-export/export'

const service = ({ strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome! 🚀';
  },
  getCollections(ctx) {
    return getCollectionsList(ctx);
  },
  getImportData(ctx) {
    return importData(ctx);
  },
  getExportData(ctx) {
    return exportData(ctx);
  }
});

export default service;
