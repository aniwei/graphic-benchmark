import CanvasKitInit, { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import { useEffect, useState, useRef } from 'react'
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
      
    }
  }, [])

  return (
    <div>
      <div style={{ position: 'relative' }} ref={rFPS}></div>
      <div ref={ref}></div>
      {
        perfs 
          ? <div>
            <p><pixi className="js"></pixi> 动画初始化性能</p>
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