/*
 * @Author: Aniwei
 * @Date: 2022-10-19 10:15:50
 */
import CanvasKitInit, { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import { useEffect, useState, useRef } from 'react'
import 'fpsmeter'


interface ICanvaskitAnimation {
  animations: string
}

export const CanvaskitAnimation: React.FC<ICanvaskitAnimation> = (props) => {
  const { animations } = props
  const ref = useRef<HTMLCanvasElement>(null)
  const rFPS = useRef<HTMLDivElement>(null)
  const [perfs, set] = useState<{
    beginAt: number,
    endAt: number,
  } | null>(null)


  useEffect(() => {
    if (ref.current && rFPS.current) {
      CanvasKitInit({
        locateFile (file: string) {
          return `/assets/canvaskit.wasm`
        },
      }).then(CanvasKit => {
        const fps = new FPSMeter(rFPS.current!)

        performance.mark('canvaskit:animation')
        const surface = CanvasKit.MakeWebGLCanvasSurface(ref.current as HTMLCanvasElement)
        const canvas = surface!.getCanvas()
        canvas.clear(CanvasKit.Color(255, 255, 255, 1))

        const animation = CanvasKit.MakeAnimation(animations as string)
        const duration = animation.duration() * 1000
        const size = animation.size()
        const bounds = CanvasKit.LTRBRect(0, 0, 533, 500)

        let firstFrame = new Date().getTime();

        function draw(canvas: Canvas) {
          const now = new Date().getTime()
          const seek = ((now - firstFrame) / duration) % 1.0

          animation.seek(seek)
          animation.render(canvas, bounds)

          surface!.requestAnimationFrame(draw)
          fps.tick()
        }

        surface!.requestAnimationFrame(draw)

        performance.mark('canvaskit:animation')
        const perfs = performance.getEntriesByName('canvaskit:animation')

        fps.show()

        set({
          beginAt: perfs[0].startTime,
          endAt: perfs[1].startTime
        })
      })
    }
  }, [])

  return (
    <div>
      <div style={{ position: 'relative' }} ref={rFPS}></div>
      <canvas width={500} height={500} ref={ref}></canvas>
      {
        perfs 
          ? <div>
            <p>canvaskit-wasm 动画初始化耗时</p>
            <table>
              <thead>
                <tr>
                  <th>开始时间</th>
                  <th>结束时间</th>
                  <th>总耗时</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{Number(perfs.beginAt).toFixed(0)}</td>
                  <td>{Number(perfs.endAt).toFixed(0)}</td>
                  <td>{Number(perfs.endAt - perfs.beginAt).toFixed(0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          : null
      }
    </div>
  )
}