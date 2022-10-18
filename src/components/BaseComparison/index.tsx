/*
 * @Author: Aniwei
 * @Date: 2022-10-18 15:15:49
 */

import styles from './index.module.scss'

interface IBaseComparison {

}

export const BaseComparison: React.FC<IBaseComparison> = () => {
  return (
    <section className={styles.baseComparison}>
      <h2>基础对比</h2>
      <p>从两者 <strong> API 风格</strong>、<strong>包大小</strong>等方面进行基础对比</p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>API 风格</th>
            <th>实现方式</th>
            <th>内容大小</th>
            <td>事件模型</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PIXI.js</td>
            <td>Flash API 风格</td>
            <td>JavaScript</td>
            <td>压缩版本 479 KB</td>
            <td>提供事件模型</td>
          </tr>
          <tr>
            <td>Canvaskit</td>
            <td>Canvas API 风格</td>
            <td>JavaScript + WebAssembly</td>
            <td>压缩版本 JavaScript 127 KB <br /> WASM 文件 7 MB </td>
            <td>无事件模型</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}