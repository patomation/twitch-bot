const fs = require('fs')
const path = require('path')

console.log('GENERATING ROUTES FILE')

const routes = fs.readdirSync(path.resolve(__dirname, '../src/overlay/routes'))
  .map((name) => name.split('.')[0])

const content = `
${routes.map((name) =>
  `import ${name.replace(/-/, '')} from "../routes/${name}"`
).join('\n')}
export const routes = [
  ${routes.map((name) => `{
    path: "/${name}",
    view: ${name.replace(/-/, '')}
  },`).join('\n')}
]

`
const GENERATED_DIR = path.resolve(__dirname, '../src/overlay/generated')
if (!fs.existsSync(GENERATED_DIR)) {
  fs.mkdirSync(GENERATED_DIR)
}
fs.writeFileSync(path.join(GENERATED_DIR, 'routes.ts'), content)
