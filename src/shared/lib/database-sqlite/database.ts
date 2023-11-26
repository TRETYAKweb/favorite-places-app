import { openDatabase, SQLError, SQLTransaction } from "expo-sqlite";
import { IPlace, Place } from "shared/models";

export interface IPlaceSQLite {
  id: number;
  title: string;
  imageUri: string;
  address: string;
  lat: number;
  lng: number;
}

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

export const insertPlace = (place: IPlace) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imgUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });

  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise<IPlace[]>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places: IPlace[] = [];

          for (const db of result.rows._array as IPlaceSQLite[]) {
            places.push(
              new Place(
                db.title,
                db.imageUri,
                db.address,
                { lat: db.lat, lng: db.lng },
                db.id.toString()
              )
            );
          }

          resolve(places);
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });

  return promise;
};

export const fetchPlaceDetails = (id: string) => {
  const promise = new Promise<IPlaceSQLite>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places WHERE id = ?",
        [id],
        (_, result) => {
          resolve(result.rows._array[0]);
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });

  return promise;
};
