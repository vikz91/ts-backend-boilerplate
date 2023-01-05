import restana from 'restana';
import { Server } from 'http';
import Debug from 'debug';
import PinoHttp from 'pino-http';
import cors from 'cors';
import BodyParser from 'body-parser';

import { IConfig } from '@interfaces/IConfig';
import { IServer } from '@interfaces/IServer';
import { RouteMeta, RouteAuth } from './routes';

const debug = Debug('App:Server');
const logger = PinoHttp();
const jsonParser = BodyParser.json();

class CAppServer implements IServer {
  config: IConfig;

  app: restana.Service<restana.Protocol.HTTP>;

  server?: Server;

  constructor(config: IConfig) {
    this.config = config;

    this.app = restana({
      errorHandler(err, req, res) {
        debug(`Something was wrong: ${err.message || err}`);
        const resObj = { err: true, data: err.message || err, stackTrace: '' };
        if (process.env.NODE_ENV !== 'production' && err.stack) {
          resObj.stackTrace = err.stack;
        }
        res.send(resObj, 500);
      },
    });
  }

  async importMiddlewares() {
    this.app.use(logger);
    this.app.use(cors());
    this.app.use(jsonParser);
  }

  async importRoutes() {
    RouteAuth(this.app);
    RouteMeta(this.app);
  }

  async Start() {
    try {
      await this.importMiddlewares();
      await this.importRoutes();
      this.app.use((req, res) => {
        res.send({ err: true, code: 404, msg: 'Resource Not Found.' }, 404);
      });

      this.server = await this.app.start(this.config.SERVER_PORT);
      debug(`Server running at https://localhost:${this.config.SERVER_PORT}`);
    } catch (e: unknown) {
      debug(`Server Err: ${e}`);
      throw new Error(`Server Error : ${(e instanceof Error) ? e.message : e}`);
    }
  }

  async Stop() {
    return new Promise((resolve, reject) => {
      this.server?.close((err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}

export default CAppServer;
