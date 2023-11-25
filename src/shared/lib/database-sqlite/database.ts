import { openDatabase, SQLError, SQLTransaction } from "expo-sqlite";

const database = openDatabase("places.db");

export const init = () => {
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx: SQLTransaction) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_: SQLTransaction, error: SQLError) => {
          reject(error);
          return true;
        }
      );
    });
  });

  return promise;
};
