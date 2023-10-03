import { ReactBoyCartridge } from "@/lib/reactboy";
import V, { Vec2, distance } from "@/lib/vec2";
import macpointer from "~/../public/macpointer.png";

class BoidSim implements ReactBoyCartridge {
	canvas!: HTMLCanvasElement;
	ctx!: CanvasRenderingContext2D;
	width = 0;
	height = 0;
	dt = 0;
	last = 0;
	now = 0;
	mx = 0;
	my = 0;

	boids: Boid[] = [];

	initialize(canvas: HTMLCanvasElement) {
		this.canvas = canvas ?? __throw(new Error("canvas"));
		this.ctx = canvas.getContext("2d") ?? __throw(new Error("canvas"));

		this.canvas.addEventListener("mousemove", this.onMouseMove);

		const { width, height } = canvas.getBoundingClientRect();
		this.width = width;
		this.height = height;

		for (let i = 0; i < 100; i++) {
			const position = {
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
			};
			const velocity = {
				x: Math.random() * 2 - 1,
				y: Math.random() * 2 - 1,
			};
			this.boids.push(
				new Boid(
					this,
					position,
					velocity,
					{ x: canvas.width, y: canvas.height },
					1,
				),
			);
		}
		console.log("boids created");

		return true;
	}

	onMouseMove(e: MouseEvent) {
		this.mx = e.clientX;
		this.my = e.clientY;
	}

	tick(ms: number) {
		this.now = ms;
		this.dt = this.now - this.last;
		this.last = this.now;

		this.ctx.clearRect(0, 0, this.width, this.height);

		for (const boid of this.boids) {
			boid.update(this.boids);
			this.ctx.fillStyle = getComputedStyle(this.canvas).getPropertyValue(
				"--accent-1",
			);
			boid.draw(this.ctx);
		}

		const radiusBounds = {
			x: this.mx,
			y: this.my,
			width: 20,
			height: 20,
		};

		const bounds = this.canvas.getBoundingClientRect();

		const p1x = Math.max(bounds.x, radiusBounds.x);
		const p1y = Math.max(bounds.y, radiusBounds.y);
		const p2x = Math.min(
			bounds.x + bounds.width,
			radiusBounds.x + radiusBounds.width,
		);
		const p2y = Math.min(
			bounds.y + bounds.height,
			radiusBounds.y + radiusBounds.height,
		);

		this.ctx.fillStyle = "white";
		this.ctx.fillRect(p1x, p1y, p2x - p1x, p2y - p1y);

	}

	destroy() {
		this.canvas.removeEventListener("mousemove", this.onMouseMove);
		this.boids = [];
	}
}

export const BoidSimCartridge = new BoidSim();

class Boid {
	range: number;
	fov: number;
	position: Vec2;
	velocity: Vec2;
	canvasSize: Vec2;
	avoidEdgeWeight: number;
	sim: BoidSim;

	constructor(
		sim: BoidSim,
		position: Vec2,
		velocity: Vec2,
		canvasSize: Vec2,
		avoidEdgeWeight: number,
	) {
		this.sim = sim;
		this.position = position;
		this.velocity = velocity;
		this.canvasSize = canvasSize;
		this.avoidEdgeWeight = avoidEdgeWeight;
		this.range = 20;
		this.fov = (Math.PI / 4) * 3;
	}

	update(boids: Boid[]) {
		const boidsInRange = boids.filter(
			(boid) => distance(boid.position, this.position) < this.range,
		);

		const avoidance = this.avoidance();

		// const separation = this.separation(boidsInRange);
		// const alignment = this.alignment(boidsInRange);
		// const cohesion = this.cohesion(boidsInRange);
		// const avoidEdge = this.avoidEdge();

		// Combine the rules and avoid edge behavior to calculate the new velocity
		// const acceleration = {
		// 	x: separation.x + alignment.x + cohesion.x + avoidEdge.x,
		// 	y: separation.y + alignment.y + cohesion.y + avoidEdge.y,
		// };

		// Limit the acceleration to a maximum value
		const maxAcceleration = 0.1;
		const maxVelocity = 2;
		// const accelerationMagnitude = Math.sqrt(
		// 	acceleration.x * acceleration.x + acceleration.y * acceleration.y,
		// );
		// if (accelerationMagnitude > maxAcceleration) {
		// 	acceleration.x =
		// 		(acceleration.x / accelerationMagnitude) * maxAcceleration;
		// 	acceleration.y =
		// 		(acceleration.y / accelerationMagnitude) * maxAcceleration;
		// }

		// Update the velocity and position based on the new acceleration
		// this.velocity.x += acceleration.x;
		// this.velocity.y += acceleration.y;
		const velocityLength = V.length(this.velocity);
		if (velocityLength > maxVelocity) {
			this.velocity = V.scale(V.normalize(this.velocity), maxVelocity);
		}

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		// Wrap around to the opposite side if the boid reaches the edge of the canvas
		// if (this.position.x > this.canvasSize.x) {
		// 	this.position.x = 0;
		// } else if (this.position.x < 0) {
		// 	this.position.x = this.canvasSize.x;
		// }

		// if (this.position.y > this.canvasSize.y) {
		// 	this.position.y = 0;
		// } else if (this.position.y < 0) {
		// 	this.position.y = this.canvasSize.y;
		// }
	}

	avoidance() {
		const bounds = {
			x: 0,
			y: 0,
			width: this.sim.width,
			height: this.sim.height,
		};

		const radiusBounds = {
			x: this.position.x - this.range / 2,
			y: this.position.y - this.range / 2,
			width: this.range,
			height: this.range,
		};

		const p1x = Math.max(bounds.x, radiusBounds.x);
		const p1y = Math.max(bounds.y, radiusBounds.y);
		const p2x = Math.min(
			bounds.x + bounds.width,
			radiusBounds.x + radiusBounds.width,
		);
		const p2y = Math.min(
			bounds.y + bounds.height,
			radiusBounds.y + radiusBounds.height,
		);
	}

	avoidEdge() {
		const edgeDistance = 50;
		const avoidEdgeForce = { x: 0, y: 0 };

		if (this.position.x < edgeDistance) {
			avoidEdgeForce.x = edgeDistance - this.position.x;
		} else if (this.position.x > this.canvasSize.x - edgeDistance) {
			avoidEdgeForce.x = this.canvasSize.x - edgeDistance - this.position.x;
		}

		if (this.position.y < edgeDistance) {
			avoidEdgeForce.y = edgeDistance - this.position.y;
		} else if (this.position.y > this.canvasSize.y - edgeDistance) {
			avoidEdgeForce.y = this.canvasSize.y - edgeDistance - this.position.y;
		}

		return {
			x: avoidEdgeForce.x * this.avoidEdgeWeight,
			y: avoidEdgeForce.y * this.avoidEdgeWeight,
		};
	}

	separation(boids: Boid[]) {
		const separationDistance = 25;
		const separation = { x: 0, y: 0 };

		for (const otherBoid of boids) {
			const distance = V.distance(this.position, otherBoid.position);
			if (distance > 0 && distance < separationDistance) {
				const difference = {
					x: this.position.x - otherBoid.position.x,
					y: this.position.y - otherBoid.position.y,
				};
				separation.x += difference.x / distance;
				separation.y += difference.y / distance;
			}
		}

		return separation;
	}

	alignment(boids: Boid[]) {
		const alignmentDistance = 50;
		const alignment = { x: 0, y: 0 };
		let neighborCount = 0;

		for (const otherBoid of boids) {
			const distance = V.distance(this.position, otherBoid.position);
			if (distance > 0 && distance < alignmentDistance) {
				alignment.x += otherBoid.velocity.x;
				alignment.y += otherBoid.velocity.y;
				neighborCount++;
			}
		}

		if (neighborCount > 0) {
			alignment.x /= neighborCount;
			alignment.y /= neighborCount;
		}

		return alignment;
	}

	cohesion(boids: Boid[]) {
		const cohesionDistance = 75;
		const cohesion = { x: 0, y: 0 };
		let neighborCount = 0;

		for (const otherBoid of boids) {
			const distance = V.distance(this.position, otherBoid.position);
			if (distance > 0 && distance < cohesionDistance) {
				cohesion.x += otherBoid.position.x;
				cohesion.y += otherBoid.position.y;
				neighborCount++;
			}
		}

		if (neighborCount > 0) {
			cohesion.x -= this.position.x;
			cohesion.y -= this.position.y;
			cohesion.x /= neighborCount;
			cohesion.y /= neighborCount;
		}

		return cohesion;
	}

	draw(ctx: CanvasRenderingContext2D) {
		const size = 6;
		const angle = Math.atan2(this.velocity.y, this.velocity.x);

		ctx.save();

		// Translate to the position of the boid
		ctx.translate(this.position.x, this.position.y);

		// Rotate the context based on the boid's velocity angle
		ctx.rotate(angle);

		// Draw a triangle shape representing the boid
		// ctx.lineJoin = "round";
		// ctx.beginPath();
		// ctx.moveTo(size, 0);
		// ctx.lineTo(-size, -size);
		// ctx.lineTo(-size, size);
		// ctx.closePath();

		// Set a color for the boid

		ctx.rotate((Math.PI / 12) * 7);
		ctx.fill();
		const path1 = new Path2D(
			"m6.148 18.473 1.863-1.003 1.615-.839-2.568-4.816h4.332l-11.379-11.408v16.015l3.316-3.221z",
		);
		const path2 = new Path2D(
			"m6.431 17 1.765-.941-2.775-5.202h3.604l-8.025-8.043v11.188l2.53-2.442z",
		);
		ctx.fillStyle = "white";
		ctx.fill(path1);
		ctx.fillStyle = "black";
		ctx.fill(path2);

		ctx.restore();
	}
}

function __throw(error: Error): never {
	throw error;
}
