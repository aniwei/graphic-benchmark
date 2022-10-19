/*
 * @Author: Aniwei
 * @Date: 2022-10-18 19:19:04
 */
import { CanvaskitFirstRender } from './CanvaskitFirstRender'
import { PIXIFirstRender } from './PIXIFirstRender'

export const FirstRender = () => {
  return (
    <section>
      <h2>首次渲染耗时</h2>
      <h3>pixi.js</h3>
      <div>
        <PIXIFirstRender />
      </div>
      <h3>canvaskit-wasm</h3>
      <div>
        <CanvaskitFirstRender />
      </div>
    </section>
  )
}