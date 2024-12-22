export default [
  {
    method: 'GET',
    path: '/',
    // name of the controller file & the method.
    handler: 'controller.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/get-collections-list',
    // name of the controller file & the method.
    handler: 'controller.getCollections',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/import-data',
    // name of the controller file & the method.
    handler: 'controller.importData',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/export-data',
    // name of the controller file & the method.
    handler: 'controller.exportData',
    config: {
      policies: [],
    },
  }
];
