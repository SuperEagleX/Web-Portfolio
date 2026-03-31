#!/usr/bin/env node
/**
 * generate-manifest.mjs
 * 
 * Run this whenever you add new Notion HTML exports to public/writeups/
 * Usage: node scripts/generate-manifest.mjs
 * 
 * It will:
 *  1. Scan public/writeups/*.html
 *  2. Read <title> and <meta> tags from each file
 *  3. Output a manifest.json you can import in your React app
 */

import { readdir, readFile, writeFile } from 'fs/promises'
import { join, basename } from 'path'

const WRITEUPS_DIR = join(process.cwd(), 'public', 'writeups')
const OUT_FILE     = join(process.cwd(), 'src', 'data', 'writeups-manifest.json')

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function extractMeta(html, name) {
  const m = html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i'))
      || html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`, 'i'))
  return m ? m[1] : ''
}

function extractTitle(html) {
  const m = html.match(/<title>([^<]+)<\/title>/i)
  return m ? m[1].replace(/\s*[|–—-].*$/, '').trim() : ''
}

async function run() {
  let files
  try {
    files = await readdir(WRITEUPS_DIR)
  } catch {
    console.error('❌  public/writeups/ directory not found. Create it first.')
    process.exit(1)
  }

  const htmlFiles = files.filter(f => f.endsWith('.html'))
  if (htmlFiles.length === 0) {
    console.log('⚠️  No HTML files found in public/writeups/')
    process.exit(0)
  }

  const manifest = []

  for (const file of htmlFiles) {
    const html = await readFile(join(WRITEUPS_DIR, file), 'utf8')
    const title = extractMeta(html, 'title') || extractTitle(html) || basename(file, '.html')
    const description = extractMeta(html, 'description') || ''
    const tags = (extractMeta(html, 'keywords') || '').split(',').map(s => s.trim()).filter(Boolean)
    const event = extractMeta(html, 'ctf-event') || ''
    const difficulty = extractMeta(html, 'ctf-difficulty') || 'easy'
    const date = extractMeta(html, 'date') || new Date().toISOString().slice(0, 10)

    manifest.push({
      slug: slugify(title || basename(file, '.html')),
      title,
      date,
      event,
      difficulty,
      tags,
      description,
      file,
    })
    console.log(`  ✓ ${file} → "${title}"`)
  }

  // Sort by date descending
  manifest.sort((a, b) => new Date(b.date) - new Date(a.date))

  await writeFile(OUT_FILE, JSON.stringify(manifest, null, 2))
  console.log(`\n✅  Manifest written to src/data/writeups-manifest.json (${manifest.length} entries)\n`)
  console.log('Next steps:')
  console.log('  • In Writeups.jsx, replace WRITEUPS_MANIFEST with:')
  console.log('    import WRITEUPS_MANIFEST from "../data/writeups-manifest.json"')
  console.log('  • Same change in WriteupDetail.jsx')
}

run()
