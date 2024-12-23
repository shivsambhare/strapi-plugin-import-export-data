import { Main, Typography, Divider } from '@strapi/design-system';
import ImportExport from './ImportExport/index';

const HomePage = () => {
  return (
    <Main padding={8} background="neutral100" shadow="tableShadow">
      <Main paddingBottom={4}>
        <Typography variant="alpha" textColor="neutral800">
          Boost Your Strapi Workflow
        </Typography>
        <br />
        <Typography variant="epsilon" textColor="neutral600">
          Import and export data seamlessly to enhance your productivity.
        </Typography>
      </Main>
      <Divider />

      <Main paddingTop={6} paddingBottom={4}>
        <Typography variant="omega" textColor="neutral700">
          - Supported Strapi version: 5+
        </Typography>
        <br />
        <Typography variant="omega" textColor="neutral700">
          - Supported file extension: CSV
        </Typography>
      </Main>
      <Main paddingTop={8}>
        <ImportExport />
      </Main>
    </Main>
  );
};

export { HomePage };
