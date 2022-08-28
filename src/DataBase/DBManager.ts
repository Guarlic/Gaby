import mongoose from 'mongoose';
import logger from '../Utils/Logger.js';

function Connect() {
  mongoose
    .connect(process.env.DBURL!, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      family: 4,
    })
    .then(() => logger.info('==> MongoDB Connected...'))
    .catch(err => logger.error(err));

  mongoose.connection.on('disconnected', Connect);
}

export default Connect;