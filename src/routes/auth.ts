import restana from 'restana';
import { IncomingMessage, ServerResponse } from 'http';
import { Wait } from '../utils';

export default function Route(app: restana.Service<restana.Protocol.HTTP>) {
  const RouteServices = {
    Login: async (
      req: IncomingMessage & restana.RequestExtensions,
      res: ServerResponse<IncomingMessage> & restana.ResponseExtensions,
    ) => {
      Wait(1);
      const { email } = req.body as { email: string };
      res.send({ login: email });
    },
  };

  app.post('/login', RouteServices.Login);

  return app;
}
