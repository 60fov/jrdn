import V, { Vec2 } from "@/lib/vec2"

export class Boid {
  position: Vec2;
  velocity: Vec2;
  canvasSize: Vec2;
  avoidEdgeWeight: number;

  constructor(position: Vec2, velocity: Vec2, canvasSize: Vec2, avoidEdgeWeight: number) {
    this.position = position;
    this.velocity = velocity;
    this.canvasSize = canvasSize;
    this.avoidEdgeWeight = avoidEdgeWeight;
  }

  update(boids: Boid[]) {
    const separation = this.separation(boids);
    const alignment = this.alignment(boids);
    const cohesion = this.cohesion(boids);
    const avoidEdge = this.avoidEdge();

    // Combine the rules and avoid edge behavior to calculate the new velocity
    const acceleration = {
      x: separation.x + alignment.x + cohesion.x + avoidEdge.x,
      y: separation.y + alignment.y + cohesion.y + avoidEdge.y
    };

    // Limit the acceleration to a maximum value
    const maxAcceleration = 0.05;
    const maxVelocity = 2;
    const accelerationMagnitude = Math.sqrt(
      acceleration.x * acceleration.x + acceleration.y * acceleration.y
    );
    if (accelerationMagnitude > maxAcceleration) {
      acceleration.x = (acceleration.x / accelerationMagnitude) * maxAcceleration;
      acceleration.y = (acceleration.y / accelerationMagnitude) * maxAcceleration;
    }

    // Update the velocity and position based on the new acceleration
    this.velocity.x += acceleration.x;
    this.velocity.y += acceleration.y;
    const velocityLength = V.length(this.velocity);
    if (velocityLength > maxVelocity) {
      this.velocity = V.scale(V.normalize(this.velocity), maxVelocity)
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Wrap around to the opposite side if the boid reaches the edge of the canvas
    if (this.position.x > this.canvasSize.x) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = this.canvasSize.x;
    }

    if (this.position.y > this.canvasSize.y) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = this.canvasSize.y;
    }
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
      y: avoidEdgeForce.y * this.avoidEdgeWeight
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
          y: this.position.y - otherBoid.position.y
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
    ctx.lineJoin = "round"
    ctx.beginPath();
    ctx.moveTo(size, 0);
    ctx.lineTo(-size, -size );
    ctx.lineTo(-size, size );
    ctx.closePath();

    // Set a color for the boid
    ctx.fill();

    ctx.restore();
  }
}