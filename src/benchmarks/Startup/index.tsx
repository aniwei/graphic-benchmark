/*
 * @Author: Aniwei
 * @Date: 2022-10-18 19:19:04
 */
import { CanvaskitStartup } from './CanvaskitStartup'

export const Startup = () => {
  return (
    <section>
      <h2>初始化耗时</h2>
      <h3>pixi.js</h3>
      <div>
        
      </div>
      <h3>canvaskit-wasm</h3>
      <div>
        <CanvaskitStartup />
      </div>
    </section>
  )
}