const log4js = require('log4js');
const server = require('./app/server');
const { PORT } = require('./config/envs');
const logConfig = require('./config/logConfig');
const { catchingUnhandledError } = require('./app/utils/unhandledError');
const { seedAdmin } = require('./app/utils/seeder_file');

log4js.configure(logConfig);
server.listen(PORT, async () => {
  catchingUnhandledError();
  seedAdmin();
  log4js.getLogger('Server').debug(`Server started on port ${PORT}`);
});
