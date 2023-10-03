import { RefObject, createContext, useCallback, useContext, useEffect, useRef } from "react"


export interface ReactBoyCartridge {
  initialize: (canvas: HTMLCanvasElement) => boolean
  tick: (ms: number) => void
  destroy: () => void
}

export function useReactBoy(cartridge: ReactBoyCartridge, options?: {
  canvasRef?: RefObject<HTMLCanvasElement>
}) {
  const { canvasRef } = options || {}
  const refRafHandle = useRef<number | null>();

  const getCanvas = () => canvasRef?.current

  // game loop
  const loop = useCallback((ms: number) => {
    cartridge.tick(ms)

    refRafHandle.current = requestAnimationFrame(loop)
  }, [cartridge, canvasRef])

  // entry point /  main fn
  useEffect(() => {
    console.log("react boy mount")
    const canvas = getCanvas()
    if (!canvas) return

    cartridge.initialize(canvas)

    loop(0)

    return () => {
      cartridge.destroy()
      if (refRafHandle.current) cancelAnimationFrame(refRafHandle.current)
    }
  }, [cartridge])
}