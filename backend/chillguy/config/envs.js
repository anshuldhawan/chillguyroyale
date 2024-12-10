/* eslint-disable max-len */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, './env/dev.env') });

module.exports = {

  PORT: process.env.PORT || 8100,
  QUEUE_PORT: process.env.QUEUE_PORT || 8010,
  NODE_ENV: process.env.NODE_ENV || 'development',

  MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,

  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || 1800,

  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS, 10) || 10,

  MESSAGE: process.env.MESSAGE,
  SOL_RPC: process.env.SOL_RPC,
  IMAGE_UPLOAD_LIMIT_IN_MB: process.env.IMAGE_UPLOAD_LIMIT_IN_MB, 
  HOSTNAME: process.env.HOSTNAME,
  INITIAL_VECTOR_HEX: process.env.INITIAL_VECTOR_HEX,
  SECURITY_KEY_HEX: process.env.SECURITY_KEY_HEX,

};
