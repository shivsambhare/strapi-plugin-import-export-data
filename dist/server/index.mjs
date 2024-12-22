const bootstrap = ({ strapi: strapi2 }) => {
};
const destroy = ({ strapi: strapi2 }) => {
};
const PLUGIN_ID = "strapi-plugin-import-export-data";
const register = ({ strapi: strapi2 }) => {
  strapi2.log.info(`${PLUGIN_ID} plugin initialized`);
};
const config = {
  default: {},
  validator() {
  }
};
const contentTypes = {};
const controller = ({ strapi: strapi2 }) => ({
  index(ctx) {
    ctx.body = strapi2.plugin(PLUGIN_ID).service("service").getWelcomeMessage();
  },
  getCollections(ctx) {
    strapi2.plugin(PLUGIN_ID).service("service").getCollections(ctx);
  },
  importData(ctx) {
    console.log("asdadas");
    strapi2.plugin(PLUGIN_ID).service("service").getImportData(ctx);
  },
  exportData(ctx) {
    strapi2.plugin(PLUGIN_ID).service("service").getExportData(ctx);
  }
});
const controllers = {
  controller
};
const middlewares = {};
const policies = {};
const routes = [
  {
    method: "GET",
    path: "/",
    // name of the controller file & the method.
    handler: "controller.index",
    config: {
      policies: []
    }
  },
  {
    method: "GET",
    path: "/get-collections-list",
    // name of the controller file & the method.
    handler: "controller.getCollections",
    config: {
      policies: []
    }
  },
  {
    method: "POST",
    path: "/import-data",
    // name of the controller file & the method.
    handler: "controller.importData",
    config: {
      policies: []
    }
  },
  {
    method: "GET",
    path: "/export-data",
    // name of the controller file & the method.
    handler: "controller.exportData",
    config: {
      policies: []
    }
  }
];
const fs = require("fs");
const { parse } = require("csv-parse/sync");
async function importData(ctx) {
  const { files } = ctx?.request;
  if (!files || !files.csv) {
    return ctx.badRequest("CSV file is required");
  }
  const file = files.csv;
  try {
    const content = fs.readFileSync(file.filepath, "utf-8");
    const records = parse(content, { columns: true }) || [];
    const model = ctx?.request?.body?.collectionName;
    for (const record of records) {
      await strapi.documents(model).create({ data: record });
    }
    ctx.send({ message: `${records.length} records imported successfully` });
  } catch (error) {
    return ctx.badRequest("Failed to import data", { error });
  }
}
function getCollectionsList(ctx) {
  const contentTypes2 = strapi.contentTypes;
  const collections = Object.entries(contentTypes2).filter(([uid, ct]) => ct.kind === "collectionType" && !uid.startsWith("plugin::") && !uid.startsWith("admin::")).map(([uid, ct]) => ({
    uid,
    name: ct.info.displayName
  }));
  ctx.send({ success: true, data: collections, message: "Collections list fetched successfully" });
}
async function exportData(ctx) {
  const model = ctx?.request?.query?.collectionName;
  if (!model) {
    return ctx.badRequest("Collection name is required");
  }
  try {
    const data = await strapi.documents(model).findMany();
    ctx.send({ success: true, data });
  } catch (error) {
    return ctx.badRequest("Failed to export data", { error });
  }
}
const service = ({ strapi: strapi2 }) => ({
  getWelcomeMessage() {
    return "Welcome! 🚀";
  },
  getCollections(ctx) {
    return getCollectionsList(ctx);
  },
  getImportData(ctx) {
    console.log("in service importData");
    return importData(ctx);
  },
  getExportData(ctx) {
    return exportData(ctx);
  }
});
const services = {
  service
};
const index = {
  bootstrap,
  destroy,
  register,
  config,
  controllers,
  contentTypes,
  middlewares,
  policies,
  routes,
  services
};
export {
  index as default
};
