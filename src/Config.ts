import * as dotEnv from 'dotenv';
import {
  cleanEnv, str, num,
} from 'envalid';

import type { IConfig } from '@interfaces/IConfig';

dotEnv.config();

const Config: IConfig = cleanEnv(process.env, {
  SERVER_PORT: num({ default: 3000, example: '3000', desc: 'backend server port number' }),
  MONGO_DB_HOST: str({ default: 'mongodb://localhost:27017/test', desc: 'MongoDB host url' }),
});

export default Object.freeze(Config);
