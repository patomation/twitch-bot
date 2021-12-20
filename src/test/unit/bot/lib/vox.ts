import test from 'ava'
import fs from 'fs'
import path from 'path'

import { prepareTempFolder } from '../../../../bff/lib/prepareTempFolder'
import { voxToFile } from '../../../../bff/lib/vox'

test('voxToFile', async (t) => {
  prepareTempFolder()
  const filePath = path.resolve('temp', 'tts_temp.wav')
  await voxToFile('test message', filePath)
  t.true(fs.existsSync(filePath))
})
