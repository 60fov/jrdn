export interface Vec2 {
	x: number;
	y: number;
}

export function add(a: Vec2, b: Vec2) {
	return { x: a.x + b.x, y: a.y + b.y };
}

export function distance(a: Vec2, b: Vec2) {
	const dx = a.x - b.x;
	const dy = a.y - b.y;
	return Math.sqrt(dx * dx + dy * dy);
}

export function length2(v: Vec2) {
	return v.x * v.x + v.y * v.y;
}

export function length(v: Vec2) {
	return Math.sqrt(length2(v));
}

export function normalize(v: Vec2) {
	const len = length(v);
	return { x: v.x / len, y: v.y / len };
}

export function scale(v: Vec2, factor: number) {
	return { x: v.x * factor, y: v.y * factor };
}

export function setLength(v: Vec2, newLength: number) {
	return scale(normalize(v), newLength);
}

const V = {
  add,
	distance,
	length2,
	length,
	normalize,
	scale,
	setLength,
};

export default V;
