/*
 * @Author: Aniwei
 * @Date: 2022-10-18 17:37:46
 */
import *  as PIXI from 'pixi.js'
import { useEffect, useRef, useState } from 'react'

interface IPIXIBatchRender {
}

export const PIXIBatchRender: React.FC<IPIXIBatchRender> = (props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [perfs, set] = useState<{
    beginAt: number,
    endAt: number,
  } | null>(null)
  const [update, setUpdate] = useState<{
    beginUpdateAt?: number | null,
    endUpdateAt?: number | null,
  } | null>(null)

  useEffect(() => {
    if (ref.current) {
      performance.mark('pixi:batch')
      const app = new PIXI.Application({ 
        backgroundColor: 0xffffff,
        height: 400,
        width: 800
      })
      ref.current.appendChild(app.view)

      let c = 0
      let r = 0

      const children: PIXI.Text[] = []
      
      for (let i = 0; i < 5000; i++) {
        const basic = new PIXI.Text(`O2 LAB`, new PIXI.TextStyle({
          fontFamily: ['Roboto', 'Noto Color Emoji'],
          fontSize: 12,
          wordWrap: true,
          wordWrapWidth: 350,
          lineJoin: 'round',
        }))
  
        basic.x = c * 50
        basic.y = r * 12

        children.push(basic)
        
        r++
        if ((i + 1) % 32 === 0) {
          c++
          r = 0
        }
      }

      app.stage.addChild(...children)

      let current = performance.now()

      performance.mark('pixi:batch')
      const perfs = performance.getEntriesByName('pixi:batch')

      set({
        beginAt: perfs[0].startTime,
        endAt: perfs[1].startTime
      })
    }
  }, [])

  return (
    <div>
      <div ref={ref}></div>
      {
        perfs 
          ? <div>
            <p>pixi.js 文字渲染性能</p>
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