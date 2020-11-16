import { INVALID_MOVE } from "boardgame.io/core";
import { Ctx, Game } from "boardgame.io";

const TicTacToe: Game = {
	setup: () => ({ cells: Array(9).fill(null) }),

	turn: {
		moveLimit: 1
	},

	moves: {
		clickCell: (G: any, ctx: Ctx, id: number) => {
			if (G.cells[id] !== null) {
				return INVALID_MOVE;
			}
			G.cells[id] = ctx.currentPlayer;
		}
	},

	endIf: (G: any, ctx: Ctx) => {
		if (IsVictory(G.cells)) {
			return { winner: ctx.currentPlayer };
		}
		if (IsDraw(G.cells)) {
			return { draw: true };
		}
	},

	ai: {
		enumerate: (G, ctx) => {
			let moves = [];
			for (let i = 0; i < 9; i++) {
				if (G.cells[i] === null) {
					moves.push({ move: "clickCell", args: [i] });
				}
			}
			return moves;
		}
	}
};

// Return true if `cells` is in a winning configuration.
function IsVictory(cells: { [x: string]: any }) {
	const positions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	const isRowComplete = (row: any[]) => {
		const symbols = row.map((i: number) => cells[i]);
		return symbols.every((i: null) => i !== null && i === symbols[0]);
	};

	return positions.map(isRowComplete).some((i) => i === true);
}

// Return true if all `cells` are occupied.
function IsDraw(cells: {
	filter: (
		arg0: (c: any) => boolean
	) => { (): any; new (): any; length: number };
}) {
	return cells.filter((c: null) => c === null).length === 0;
}

export default TicTacToe;
