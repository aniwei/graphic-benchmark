/*
 * @Author: Aniwei
 * @Date: 2022-10-18 19:19:04
 */
import { CanvaskitPath } from './CanvaskitPath'
import { PIXIPath } from './PIXIPath'

export const Path = () => {
  return (
    <section>
      <h2>路径渲染</h2>
      <h3>pixi.js</h3>
      <div>
        <PIXIPath 
          x={100}
          y={100}
          r={64}
          w={4}
          color={0x000000}
        />
      </div>
      <h3>canvaskit-wasm</h3>
      <div>
        <CanvaskitPath 
          x={100}
          y={100}
          r={64}
          w={4}
          color={`#000000`}
        />
      </div>
    </section>
  )
}