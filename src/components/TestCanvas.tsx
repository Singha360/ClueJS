import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Circle } from "react-konva";
import Konva from "konva";

export default function TestCanvas() {
	const [position, setPosition] = useState({
		x: 0,
		y: 0
	});

	const circleRef = useRef(null) as React.RefObject<any>;

	function update(event: Konva.KonvaEventObject<DragEvent>) {
		setPosition(() => {
			return { x: event.target.x(), y: event.target.y() };
		});
	}

	useEffect(() => {
		console.log(position);
		console.log(circleRef.current);
	});

	function move(event: React.KeyboardEvent<HTMLDivElement>): void {
		event.preventDefault();
		switch (event.key) {
			case "ArrowUp":
				setPosition((prevPosition) => {
					return {
						...prevPosition,
						y: prevPosition.y - 5
					};
				});
				break;
			case "ArrowDown":
				setPosition((prevPosition) => {
					return {
						...prevPosition,
						y: prevPosition.y + 5
					};
				});
				break;
			case "ArrowLeft":
				setPosition((prevPosition) => {
					return {
						...prevPosition,
						x: prevPosition.x - 5
					};
				});
				break;
			case "ArrowRight":
				setPosition((prevPosition) => {
					return {
						...prevPosition,
						x: prevPosition.x + 5
					};
				});
				break;
			default:
				break;
		}
	}

	const stageSize = 500;

	return (
		<div
			tabIndex={0}
			onKeyDown={move}
			style={{
				height: stageSize,
				width: stageSize,
				position: "relative",
				margin: "auto"
			}}
		>
			<Stage
				width={stageSize}
				height={stageSize}
				style={{ background: "#F0F0F0" }}
			>
				<Layer>
					<Circle
						id={"0"}
						key={0}
						radius={stageSize / 16}
						draggable={true}
						fill={"blue"}
						shadowColor="black"
						x={position.x}
						y={position.y}
						onDragEnd={update}
						ref={circleRef}
					></Circle>
				</Layer>
			</Stage>
		</div>
	);
}
