/*
 * @Author: Aniwei
 * @Date: 2022-10-18 19:19:04
 */
import { CanvaskitBatchRender } from './CanvaskitBatchRender'
import { PIXIBatchRender } from './PIXIBatchRender'

export const BatchRender = () => {
  return (
    <section>
      <h2>大量渲染</h2>
      <h3>pixi.js</h3>
      <div>
        <PIXIBatchRender />
      </div>
      <h3>canvaskit-wasm</h3>
      <div>
        <CanvaskitBatchRender />
      </div>
    </section>
  )
}