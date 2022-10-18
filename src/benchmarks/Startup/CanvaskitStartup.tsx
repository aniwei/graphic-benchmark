/*
 * @Author: Aniwei
 * @Date: 2022-10-18 19:21:26
 */
import CanvasKitInit from 'canvaskit-wasm'
import { useEffect, useState } from 'react'

interface ICanvaskitStartup {

}

export const CanvaskitStartup: React.FC<ICanvaskitStartup> = () => {
  const [perfs, set] = useState<{
    beginAt: number,
    endAt: number
  } | null>(null)

  useEffect(() => {
    performance.mark('canvaskit-wasm:startup')
    CanvasKitInit({
      locateFile (file: string) {
        return `https://storage.360buyimg.com/layout/assets/canvaskit.wasm?Expires=3813576971&AccessKey=6VYUraRHWSEgtjDf&Signature=6dH1iZYQleuNH1zXgNOFkSmz%2B1g%3D`
      },
    }).then(CanvasKit => {
      performance.mark('canvaskit-wasm:startup:fetch')

      const perf1 = performance.getEntriesByName(`canvaskit-wasm:startup`)[0]
      const perf2 = performance.getEntriesByName(`canvaskit-wasm:startup:fetch`)[0]

      set({
        beginAt: perf1.startTime,
        endAt: perf2.startTime
      })
    })
  }, [])

  return (
    <div>
      {
        perfs 
          ? <div>
            <p>canvaskit-wasm 网络初始化耗时，无 Gzip 压缩</p>
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
          : <div style={{ display: 'flex', minHeight: '100px', alignItems: 'center' }}>请等待</div>
      }
    </div>
  )
}