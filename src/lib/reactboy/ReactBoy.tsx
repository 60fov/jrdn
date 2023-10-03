import { useEffect, useRef, useState } from "react";
import { ReactBoyCartridge, useReactBoy } from "../reactboy";

//too
export default function ReactBoy(
	props: {
		cartridge: ReactBoyCartridge;
		displayMode?: "screen" | "page";
	} & React.HTMLProps<HTMLCanvasElement>,
) {
	const { displayMode, ...restProps } = props;

	const refCanvas = useRef<HTMLCanvasElement>(null);
	const refContext = useRef<CanvasRenderingContext2D | null>();

	useReactBoy(props.cartridge, {
		canvasRef: refCanvas,
	});

	useEffect(() => {
		const canvas = refCanvas.current;
		if (!canvas) return;

		if (props.displayMode === "screen") {
			canvas.style.width = `${window.innerWidth}px`;
			canvas.style.height = `${window.innerHeight}px`;
		} else if (props.displayMode === "page") {
			const docRect = document.documentElement.getBoundingClientRect();
			canvas.style.width = `${docRect.width}px`;
			canvas.style.height = `${docRect.height}px`;
		}

		const dpr = window.devicePixelRatio || 1;
		// Get the size of the canvas in CSS pixels.
		const rect = canvas.getBoundingClientRect();
		// Give the canvas pixel dimensions of their CSS
		// size * the device pixel ratio.
		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;

		const context = canvas.getContext("2d");
		// Scale all drawing operations by the dpr, so you
		// don't have to worry about the difference.
		context?.scale(dpr, dpr);

		refContext.current = context;

		return () => {};
	}, []);

	return (
		<canvas ref={refCanvas} {...restProps}>
			no canvas
		</canvas>
	);
}
