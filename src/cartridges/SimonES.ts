import { ReactBoyCartridge } from "@/lib/reactboy";

const GRID_SIZE = 2;
const TILE_SIZE = 100;
const TILE_GAP = 5;
const GRID_PIXEL_SIZE = (TILE_SIZE + TILE_GAP) * GRID_SIZE;

let sequence: number[];
let sequenceIndex: number;
let sequenceAccum: number;
let showTime: number;
let gapTime: number;
let state: "playing" | "recording";

const mouse = {
	screenX: 0,
	screenY: 0,
	pageX: 0,
	pageY: 0,
	button: new Array<boolean>(32),
};

function initialize() {
	sequence = [1, 2, 0, 0, 1, 3];
	sequenceIndex = 0;
	sequenceAccum = 0;
	showTime = 1000;
	gapTime = 500;
	state = "recording";

	window.addEventListener("mousemove", onMouseMove);
	window.addEventListener("mousedown", onMouseDown);
	window.addEventListener("mouseup", onMouseUp);

	return true;
}

function destroy() {
	window.removeEventListener("mousemove", onMouseMove);
	window.removeEventListener("mousedown", onMouseDown);
	window.removeEventListener("mouseup", onMouseUp);
}

function onMouseMove(e: MouseEvent) {
	mouse.screenX = e.clientX;
	mouse.screenY = e.clientY;
	mouse.pageX = e.pageX;
	mouse.pageX = e.pageY;
}

function onMouseDown(e: MouseEvent) {
	mouse.button[e.button] = true;
}

function onMouseUp(e: MouseEvent) {
	mouse.button[e.button] = false;
}

function tick(ms: number) {
	if (state === "playing") {
		sequenceAccum += ms;
		if (sequenceAccum > showTime + gapTime) {
			sequenceIndex++;
			sequenceAccum = 0;
		}
		if (sequenceIndex >= sequence.length) {
			state = "recording";
			sequenceIndex = 0;
			sequenceAccum = 0;
		}
	} else if (state === "recording") {
		
	}
}

function draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
	const { width, height } = canvas.getBoundingClientRect();
	ctx.clearRect(0, 0, width, height);

	const xs = (width - GRID_PIXEL_SIZE) / 2;
	const ys = (height - GRID_PIXEL_SIZE) / 2;

	for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
		const x = (i % GRID_SIZE) * (TILE_SIZE + TILE_GAP) + xs;
		const y = Math.floor(i / GRID_SIZE) * (TILE_SIZE + TILE_GAP) + ys;

		const point = { x: mouse.screenX, y: mouse.screenY };
		const rect = { x, y, w: TILE_SIZE, h: TILE_SIZE };

		if (state === "recording") {
			if (intersectionPointRect(point, rect)) {
				if (mouse.button[0]) {
					ctx.fillStyle =
						getComputedStyle(canvas).getPropertyValue("--accent-3");
				} else {
					ctx.fillStyle =
						getComputedStyle(canvas).getPropertyValue("--accent-2");
				}
			} else {
				ctx.fillStyle = getComputedStyle(canvas).getPropertyValue("--accent-1");
			}
			ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
		} else if (state === "playing") {
			const currentTile = sequence[sequenceIndex];
			const isActive = currentTile === i;
			const isGapTime = sequenceAccum > showTime;
			if (isActive && !isGapTime) {
				ctx.fillStyle =
					getComputedStyle(canvas).getPropertyValue("--foreground");
			} else {
				ctx.fillStyle = getComputedStyle(canvas).getPropertyValue("--accent-1");
			}
			ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
		}
	}

	ctx.fillStyle = "blue";
	ctx.fillRect(mouse.screenX - 5, mouse.screenY, 10, 10);
}

function intersectionPointRect(
	point: { x: number; y: number },
	rect: { x: number; y: number; w: number; h: number },
): Boolean {
	return !(
		point.x < rect.x ||
		point.x > rect.x + rect.w ||
		point.y < rect.y ||
		point.y > rect.y + rect.h
	);
}

const SimonESCartridge: ReactBoyCartridge = {
	initialize,
	tick,
	// draw,
	destroy,
};

export default SimonESCartridge;
