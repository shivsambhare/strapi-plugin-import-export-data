import { PLUGIN_ID } from '../../constants';

const register = ({ strapi }) => {
  strapi.log.info(`${PLUGIN_ID} plugin initialized`);
};

export default register;
