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
				`SELECT * FROM tetrisScores ORDER BY score DESC;`,
				[],
				(_, result) => resolve(result),
				(_, err) => reject(err)
			);
		});
	});
	return promise;
};

export const prune = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`DELETE FROM tetrisScores WHERE id NOT IN (SELECT id FROM tetrisScores ORDER BY score DESC LIMIT 10);`,
				[],
				(_, result) => resolve(result),
				(_, err) => reject(err)
			);
		});
	});
	return promise;
};