
import styles from './index.module.scss'

import { PIXIText } from './PIXIText'

interface IText {

}

export const Text: React.FC<IText> = () => {
  return (
    <section>
      <h2>文字渲染</h2>
      <h3>pixi.js</h3>
      <div>
        {/* <PIXIText /> */}
      </div>

      <h3>canvaskit-wasm</h3>
      <div>

      </div>
    </section>
  )
}