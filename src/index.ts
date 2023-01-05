import Debug from 'debug';

import CAppServer from './server';
import Config from './Config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const debug = Debug('App');

const Main = async () => {
  debug('Starting AppServer ...');
  try {
    const appServer = new CAppServer(Config);
    await appServer.Start();
  } catch (e) {
    debug('App Server Error: ', e);
    process.exit(-1);
  }
};

Main();
