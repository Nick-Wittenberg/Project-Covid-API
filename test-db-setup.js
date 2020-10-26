// import { MongoMemoryServer } from 'mongodb-memory-server';
// import { connect, disconnect } from './src/database';

// const mongodOpts = {
//   instance: {
//     port: 27018,
//     dbName: 'covidAPI',
//   }
// }

// let mongod;

// beforeAll(async () => {
//   mongod = new MongoMemoryServer(mongodOpts);

//   await mongod.getUri(); // setup fails if this is not executed ...

//   await connect();
//   // await Country.collection.insertMany(countries);
//   await disconnect();
// });

// afterAll(async () => {
//   await mongod.stop();
// });
