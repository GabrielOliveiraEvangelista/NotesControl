import { databasePath } from "../sqlite/index.js";

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: databasePath
    },
    migrations: {
      directory: '../migrations'
    },
    useNullAsDefault: true
  }
  
};
