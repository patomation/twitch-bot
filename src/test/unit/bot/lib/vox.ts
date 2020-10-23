import test from 'ava'
import fs from 'fs'
import path from 'path'

import { prepareTempFolder } from '../../../../bot/lib/prepareTempFolder'
import { voxToFile } from '../../../../bot/lib/vox'

test('voxToFile', async (t) => {
  prepareTempFolder()
  const filePath = path.resolve('temp', 'tts_temp.wav')
  await voxToFile('test message', filePath)
  t.true(fs.existsSync(filePath))
})
