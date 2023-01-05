import { Server } from 'http';
import restana from 'restana';
import { IConfig } from './IConfig';

export interface IServer {
  config: IConfig;
  app: restana.Service<restana.Protocol.HTTP>;
  server?: Server;

  Start: () => Promise<void>;
  Stop: () => Promise<unknown>;
}
