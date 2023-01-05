import restana from 'restana';

export default function Route(app: restana.Service<restana.Protocol.HTTP>) {
  app.get('/', (req, res) => {
    res.send({ app: 'ok' });
  });

  return app;
}
