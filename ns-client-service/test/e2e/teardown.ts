import { getDatasource } from './util';

const teardown = async () => {
  await globalThis.testContainer.stop();
  await (await getDatasource()).destroy();
};

export default teardown;
