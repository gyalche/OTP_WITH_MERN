import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
async function connect() {
  const mongo = await MongoMemoryServer.create();
  const getUri = mongo.getUri();
  //   mongoose.set('stictQuery', true);
  const db = await mongoose.connect(getUri);
  console.log('Database connected');
  return db;
}

export default connect;
