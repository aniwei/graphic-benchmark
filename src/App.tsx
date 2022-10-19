/*
 * @Author: Aniwei
 * @Date: 2022-10-17 19:30:52
 */
import { useState } from 'react'

import { Introduction } from '@components/Introduction'
import { BaseComparison } from '@components/BaseComparison'
import { MatureSolution } from '@components/MatureSolution'

import { Startup } from '@benchmarks/Startup'
import { FirstRender } from '@benchmarks/FirstRender'
import { Path } from '@benchmarks/Path'
import { Text } from '@benchmarks/Text'
import { Image } from '@benchmarks/Image'
import { Animation } from '@benchmarks/Animation'
import { BatchRender } from '@benchmarks/BatchRender'

import styles from './index.module.scss'

function App() {
  return (
    <div className={styles.app}>
      {/* <Introduction /> */}
      <BaseComparison />
      {/* <Startup /> */}
      <FirstRender />
      <Text />
      <Image />
      <Path />
      <Animation />
      <BatchRender />

      <MatureSolution />
    </div>
  )
}

export default App
