/*
 * @Author: Aniwei
 * @Date: 2022-10-18 17:37:46
 */
import *  as PIXI from 'pixi.js'
import { useEffect, useRef, useState } from 'react'

interface IPIXIText {
  texts: string
}

export const PIXIText: React.FC<IPIXIText> = (props) => {
  const { texts } = props
  const ref = useRef<HTMLDivElement>(null)
  const [perfs, set] = useState<{
    beginAt: number,
    endAt: number,
  } | null>(null)

  useEffect(() => {
    if (ref.current) {
      performance.mark('pixi:text')
      const app = new PIXI.Application({ 
        backgroundColor: 0xffffff,
        height: 500,
        width: 800
      })
      ref.current.appendChild(app.view)
      
      const basic = new PIXI.Text(texts, new PIXI.TextStyle({
        fontFamily: ['Roboto', 'Noto Color Emoji'],
        fontSize: 30,
        wordWrap: true,
        wordWrapWidth: 350,
        lineJoin: 'round',
      }))

      basic.x = 0
      basic.y = 0

      app.stage.addChild(basic)

      performance.mark('pixi:text')
      const perfs = performance.getEntriesByName('pixi:text')

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
            <p>pixi.js 路径渲染性能</p>
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