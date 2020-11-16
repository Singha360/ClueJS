import React, { CSSProperties } from "react";
import { BoardProps } from "boardgame.io/react";

interface GameOver {
	winner: boolean;
	draw: boolean;
}

function Board(props: BoardProps) {
	const onClick = (id: number) => {
		props.moves.clickCell(id);
	};

	const winner = () => {
		let gameover: GameOver = props.ctx.gameover;

		if (gameover) {
			console.log(gameover.winner !== undefined); // true or false

			if (props.ctx.gameover.winner !== undefined) {
				return <div id="winner">Winner : {gameover.winner}!</div>;
			} else if (props.ctx.gameover.draw) {
				return <div id="winner">Draw</div>;
			}
		}
	};

	let tbody = () => {
		const tbody = [];
		for (let i = 0; i < 3; i++) {
			let cells = [];
			for (let j = 0; j < 3; j++) {
				const id = 3 * i + j;
				cells.push(
					<td style={cellStyle} key={id} onClick={() => onClick(id)}>
						{props.G.cells[id]}
					</td>
				);
			}
			tbody.push(<tr key={i}>{cells}</tr>);
		}
		return tbody;
	};

	const cellStyle: CSSProperties = {
		color: "blue",
		border: "1px solid #555",
		width: "50px",
		height: "50px",
		lineHeight: "50px",
		textAlign: "center"
	};

	return (
		<div>
			<table id="board">
				<tbody>{tbody()}</tbody>
			</table>
			{winner()}
		</div>
	);
}

export default Board;
