import { type ReactBoyCartridge } from "@/lib/reactboy"

class SimonCartridge implements ReactBoyCartridge {
  sequence: number[]
  x: number

  constructor() {
    console.log("catridge created")
    this.sequence = []
    this.x = 0
  }

  initialize() {
    console.log("catridge initialize")
    return true
  }

  tick(ms: number) {
    this.x = Math.sin(ms / 1000) * 100 + 100
  }

  draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    // ctx.fillStyle = getComputedStyle(canvas).color
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, 1000, 100, 100)
  }

  destroy() {
    console.log("catridge destroy")
  }
}

const SimonClassCartridge = new SimonCartridge()

export default SimonClassCartridge