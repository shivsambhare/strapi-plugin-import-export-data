import { Main } from '@strapi/design-system';
import ImportExport from './ImportExport/index';

const HomePage = () => {
  return (
    <Main>
      <h1>Boost Your Strapi Workflow with importing and exporting data</h1>
      <br />
      <h2>Suppoted Strapi version: 5+</h2>
      <h2>Suppoted file extension: csv</h2>
      <ImportExport />
    </Main>
  );
};

export { HomePage };
