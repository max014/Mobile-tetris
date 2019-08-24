import { SQLite } from 'expo-sqlite';

const db = SQLite.openDatabase("tetrisScores.db");

export const init = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS tetrisScores (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, score INTEGER NOT NULL);`,
				[],
				() => resolve(),
				(_, err) => reject(err)
			);
		});
	});
	return promise;
};

export const insertScore = (name, score) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`INSERT INTO tetrisScores (name, score) VALUES (?, ?);`,
				[name, score],
				(_, result) => resolve(result),
				(_, err) => reject(err)
			);
		});
	});
	return promise;
};

export const fetchScores = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`SELECT * FROM tetrisScores;`,
				[],
				(_, result) => resolve(result),
				(_, err) => reject(err)
			);
		});
	});
	return promise;
}