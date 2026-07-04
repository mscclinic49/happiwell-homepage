const fs = require('fs')
const path = require('path')
const manifestPath = path.join(__dirname, '..', '.next', 'server', 'functions-config-manifest.json')
try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  if (manifest.functions?.['/_middleware']) {
    delete manifest.functions['/_middleware']
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
    console.log('[patch-netlify-manifest] Removed /_middleware — auth handled by server layout')
  } else {
    console.log('[patch-netlify-manifest] No /_middleware entry found, nothing to patch')
  }
} catch (err) {
  console.error('[patch-netlify-manifest] Failed:', err.message)
  process.exit(1)
}
