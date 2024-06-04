import { databasePath } from "../sqlite/index.js";

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: databasePath
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    migrations: {
      directory: '../migrations'
    },
    useNullAsDefault: true
  }
  
};
