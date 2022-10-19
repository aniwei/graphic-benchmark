/*
 * @Author: Aniwei
 * @Date: 2022-10-19 10:15:50
 */
import * as PIXI from 'pixi.js'
import CanvasKitInit, { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import { useEffect, useState, useRef } from 'react'
import { AnimationManager } from 'lottie-pixi'
import 'fpsmeter'


interface IPIXIAnimation {
  animations: string
}

export const PIXIAnimation: React.FC<IPIXIAnimation> = (props) => {
  const { animations } = props
  const ref = useRef<HTMLDivElement>(null)
  const rFPS = useRef<HTMLDivElement>(null)
  const [perfs, set] = useState<{
    beginAt: number,
    endAt: number,
  } | null>(null)


  useEffect(() => {
    if (ref.current && rFPS.current) {
      performance.mark('pixi:animation')
      const app = new PIXI.Application({ 
        width: 500,
        height: 500,
        antialias: true,
      })
      ref.current.appendChild(app.view)
      const animationManager = new AnimationManager(app)
      const fps = new FPSMeter(rFPS.current!)

      // parse one or more anims
      const anim1 = animationManager.parseAnimation({
        keyframes: JSON.parse(animations),
        infinite: true
      })

      performance.mark('pixi:animation')
      
      app.stage.addChild(anim1.group)

      app.ticker.add(() => {
        fps.tick()
      })

      fps.show()
      
      const perfs = performance.getEntriesByName('pixi:animation')
      set({
        beginAt: perfs[0].startTime,
        endAt: perfs[1].startTime
      })
    }
  }, [])

  return (
    <div>
      <div style={{ position: 'relative' }} ref={rFPS}></div>
      <div ref={ref}></div>
      {
        perfs 
          ? <div>
            <p>pixi.js 动画初始化性能</p>
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