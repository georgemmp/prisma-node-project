import { app } from './server';
import { logger } from './shared/log/logger';
import { PORT } from './config/environments';

const log = logger('init');

const main = (port: number) => {
  app.listen(port, () => log.info('Server is running'));
};

main(Number(PORT));
