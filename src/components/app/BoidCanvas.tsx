import { useCallback, useEffect, useRef, useState } from "react";
import { Boid } from "@/lib/boids";

export default function Canvas(props: React.HTMLProps<HTMLCanvasElement>) {
	const { ...restProps } = props;

	const refRafHandle = useRef<number>();
	const refCanvas = useRef<HTMLCanvasElement>(null);
	const refCtx = useRef<CanvasRenderingContext2D | null>();
	const refBoids = useRef<Boid[]>([]);
	const refLastTime = useRef(0);
	const refDelta = useRef(0);

	const [count, setCount] = useState(0);

	const handleResize = (e: UIEvent) => {
		if (!refCanvas.current) return;
		const rect = document.documentElement.getBoundingClientRect();
		refCanvas.current.width = rect.width;
		refCanvas.current.height = rect.height;
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (!refCanvas.current) return;
		const canvas = refCanvas.current;
		const docRect = document.documentElement.getBoundingClientRect();
		canvas.width = docRect.width;
		canvas.height = docRect.height;
		refCtx.current = canvas.getContext("2d");
		console.log("canvas load");

		const boids = refBoids.current;
		for (let i = 0; i < 100; i++) {
			const position = {
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
			};
			const velocity = {
				x: Math.random() * 2 - 1,
				y: Math.random() * 2 - 1,
			};
			boids.push(
				new Boid(position, velocity, { x: canvas.width, y: canvas.height }, 1),
			);
		}
		console.log("boids created");

		function animate(time: number) {
			refDelta.current = time - refLastTime.current;
			refLastTime.current = time;

			const ctx = refCtx.current;
			const canvas = refCanvas.current;
			if (!ctx || !canvas) return;
			// Clear the canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Update and draw each boid
			const boids = refBoids.current;
			for (const boid of boids) {
				boid.update(boids);
				ctx.fillStyle = getComputedStyle(refCanvas.current).color;
				boid.draw(ctx);
				// ctx.beginPath();
				// ctx.arc(boid.position.x, boid.position.y, 5, 0, 2 * Math.PI);

				// ctx.fill();
			}

			refRafHandle.current = requestAnimationFrame(animate);
			return refRafHandle.current;
		}

		if (refCtx.current) {
			refRafHandle.current = animate(0);
			console.log("animation started", refRafHandle.current);
		}

		return () => {
			if (refRafHandle.current) {
				console.log("animation cancel'd", refRafHandle.current);
				cancelAnimationFrame(refRafHandle.current);
			}

			refBoids.current = [];
			console.log("boids cleared");
		};
	}, []);

	return (
		<canvas onClick={() => setCount(count + 1)} ref={refCanvas} {...restProps}>
			no canvas
		</canvas>
	);
}
