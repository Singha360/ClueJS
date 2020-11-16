import React from "react";
import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import Game from "./Game";
import Board from "./components/Board";

const isDev = process.env.NODE_ENV === "development" ? true : false;

const TicTacToe = Client({
	game: Game,
	board: Board,
	debug: isDev,
	multiplayer: Local({
		persist: true,
		storageKey: "TTT"
	})
});

const App = () => {
	return (
		<div>
			<TicTacToe playerID="0" />
			<TicTacToe playerID="1" />
		</div>
	);
};

export default App;
