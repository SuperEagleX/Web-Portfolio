import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Writeups.module.css'

// Static manifest — update this array when you add new HTML exports from Notion
// OR generate this automatically with a build script (see README)
const WRITEUPS_MANIFEST = [
  {
    slug: 'picoctf-2024-buffer-overflow',
    title: 'picoCTF 2024 — Buffer Overflow 3',
    date: '2024-03-18',
    event: 'picoCTF',
    difficulty: 'medium',
    tags: ['pwn', 'binary', 'linux'],
    description: 'Exploiting a classic stack buffer overflow to redirect execution flow and capture the flag.',
    file: 'picoctf-2024-buffer-overflow.html',
  },
  {
    slug: 'htb-lame',
    title: 'HackTheBox: Lame — Classic Samba CVE',
    date: '2024-02-10',
    event: 'HackTheBox',
    difficulty: 'easy',
    tags: ['linux', 'metasploit', 'cve'],
    description: 'Exploiting CVE-2007-2447 in Samba usermap script to gain root on the classic Lame machine.',
    file: 'htb-lame.html',
  },
  {
    slug: 'angstromctf-crypto',
    title: 'ångstromCTF — RSA Crypto Cluster',
    date: '2024-04-05',
    event: 'ångstromCTF',
    difficulty: 'hard',
    tags: ['crypto', 'rsa', 'python'],
    description: 'A series of RSA challenges chaining small exponent, common modulus, and Coppersmith attacks.',
    file: 'angstromctf-crypto.html',
  },
  {
    slug: 'htb-jerry',
    title: 'HackTheBox: Jerry — Apache Tomcat WAR',
    date: '2024-01-22',
    event: 'HackTheBox',
    difficulty: 'easy',
    tags: ['windows', 'tomcat', 'web'],
    description: 'Abusing default Tomcat credentials to deploy a malicious WAR file and get SYSTEM.',
    file: 'htb-jerry.html',
  },
]

const DIFFICULTY_COLORS = {
  easy: { bg: 'var(--green-light)', color: 'var(--green)', border: '#bbf7d0' },
  medium: { bg: 'var(--amber-light)', color: 'var(--amber)', border: '#fde68a' },
  hard: { bg: 'var(--red-light)', color: 'var(--red)', border: '#fecaca' },
}

const ALL_TAGS = [...new Set(WRITEUPS_MANIFEST.flatMap(w => w.tags))].sort()
const ALL_EVENTS = [...new Set(WRITEUPS_MANIFEST.map(w => w.event))].sort()

export default function Writeups() {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('all')
  const [activeEvent, setActiveEvent] = useState('all')
  const [sort, setSort] = useState('newest')

  const filtered = WRITEUPS_MANIFEST
    .filter(w => {
      const q = search.toLowerCase()
      const matchSearch = !q ||
        w.title.toLowerCase().includes(q) ||
        w.tags.some(t => t.includes(q)) ||
        w.description.toLowerCase().includes(q)
      const matchTag = activeTag === 'all' || w.tags.includes(activeTag)
      const matchEvent = activeEvent === 'all' || w.event === activeEvent
      return matchSearch && matchTag && matchEvent
    })
    .sort((a, b) => {
      if (sort === 'newest') return new Date(b.date) - new Date(a.date)
      if (sort === 'oldest') return new Date(a.date) - new Date(b.date)
      return a.title.localeCompare(b.title)
    })

  return (
    <div className={`${styles.page} page-enter`}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <div className={styles.breadcrumb}>
            <span className="mono">~/writeups</span>
          </div>
          <h1 className={styles.pageTitle}>Writeups</h1>
          <p className={styles.pageDesc}>
            Detailed walkthroughs of CTF challenges, HackTheBox machines, and security research.
            Upload your HTML exports from Notion into <code>public/writeups/</code>.
          </p>
        </div>

        {/* Filter bar */}
        <div className={styles.filterBar}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>⌕</span>
            <input
              className={styles.search}
              type="text"
              placeholder="Search writeups..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.filters}>
            <select
              className={styles.select}
              value={activeEvent}
              onChange={e => setActiveEvent(e.target.value)}
            >
              <option value="all">All events</option>
              {ALL_EVENTS.map(e => <option key={e} value={e}>{e}</option>)}
            </select>

            <select
              className={styles.select}
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="alpha">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Tag pills */}
        <div className={styles.tagBar}>
          {['all', ...ALL_TAGS].map(tag => (
            <button
              key={tag}
              className={`${styles.tagPill} ${activeTag === tag ? styles.tagActive : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className={styles.resultCount}>
          <span className="mono">{filtered.length}</span> writeup{filtered.length !== 1 ? 's' : ''}
          {(search || activeTag !== 'all' || activeEvent !== 'all') ? ' found' : ' total'}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🔍</span>
            <p>No writeups match your search.</p>
            <button onClick={() => { setSearch(''); setActiveTag('all'); setActiveEvent('all') }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((w, i) => {
              const diff = DIFFICULTY_COLORS[w.difficulty] || DIFFICULTY_COLORS.easy
              return (
                <Link
                  key={w.slug}
                  to={`/writeups/${w.slug}`}
                  className={styles.card}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className={styles.cardTop}>
                    <div className={styles.cardMeta}>
                      <span className={styles.cardEvent}>{w.event}</span>
                      <span
                        className={styles.cardDiff}
                        style={{ background: diff.bg, color: diff.color, borderColor: diff.border }}
                      >
                        {w.difficulty}
                      </span>
                    </div>
                    <span className={styles.cardDate}>{w.date}</span>
                  </div>

                  <h3 className={styles.cardTitle}>{w.title}</h3>
                  <p className={styles.cardDesc}>{w.description}</p>

                  <div className={styles.cardFooter}>
                    <div className={styles.cardTags}>
                      {w.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <span className={styles.cardArrow}>→</span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
