import { execSync } from 'child_process'
import { existsSync } from 'fs'

const args = process.argv.slice(2) // Get command-line arguments
if (args.length < 2) {
  console.error(
    '❌ Usage: node scripts/check-build.js <path-to-check> <command>',
  )
  process.exit(1)
}

const [pathToCheck, ...commandParts] = args
const command = commandParts.join(' ') // Combine the command parts into a full string

if (!existsSync(pathToCheck)) {
  console.log(`⚡ Running: ${command} (since ${pathToCheck} does not exist)`)
  execSync(command, { stdio: 'inherit', shell: true })
} else {
  console.log(`✅ Skipping: ${pathToCheck} already exists.`)
}
