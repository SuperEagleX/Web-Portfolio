import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './WriteupDetail.module.css'

// Must match the manifest in Writeups.jsx
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

const DIFF_COLORS = {
  easy: { bg: 'var(--green-light)', color: 'var(--green)', border: '#bbf7d0' },
  medium: { bg: 'var(--amber-light)', color: 'var(--amber)', border: '#fde68a' },
  hard: { bg: 'var(--red-light)', color: 'var(--red)', border: '#fecaca' },
}

export default function WriteupDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const writeup = WRITEUPS_MANIFEST.find(w => w.slug === slug)

  const [content, setContent] = useState(null)
  const [status, setStatus] = useState('loading') // loading | found | notfound | no-file

  useEffect(() => {
    if (!writeup) { setStatus('notfound'); return }

    fetch(`/writeups/${writeup.file}`)
      .then(res => {
        if (!res.ok) throw new Error('not found')
        return res.text()
      })
      .then(html => {
        // Extract body content from the Notion HTML export
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        // Notion puts content inside <article> or just <body>
        const article = doc.querySelector('article') || doc.body
        setContent(article.innerHTML)
        setStatus('found')
      })
      .catch(() => {
        setStatus('no-file')
      })
  }, [slug, writeup])

  if (status === 'notfound') {
    return (
      <div className={styles.error}>
        <h2>Writeup not found</h2>
        <Link to="/writeups">← Back to writeups</Link>
      </div>
    )
  }

  const diff = writeup ? (DIFF_COLORS[writeup.difficulty] || DIFF_COLORS.easy) : {}

  return (
    <div className={`${styles.page} page-enter`}>
      <div className={styles.inner}>
        {/* Back link */}
        <Link to="/writeups" className={styles.back}>
          ← back to writeups
        </Link>

        {writeup && (
          <div className={styles.header}>
            <div className={styles.headerMeta}>
              <span className={styles.event}>{writeup.event}</span>
              <span
                className={styles.diff}
                style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}` }}
              >
                {writeup.difficulty}
              </span>
              <span className={styles.date}>{writeup.date}</span>
            </div>
            <h1 className={styles.title}>{writeup.title}</h1>
            <p className={styles.desc}>{writeup.description}</p>
            <div className={styles.tags}>
              {writeup.tags.map(t => <span key={t} className="tag accent">{t}</span>)}
            </div>
          </div>
        )}

        <div className={styles.contentArea}>
          {status === 'loading' && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <span>Loading writeup…</span>
            </div>
          )}

          {status === 'no-file' && (
            <div className={styles.noFile}>
              <div className={styles.noFileIcon}>📄</div>
              <h3>HTML file not found</h3>
              <p>
                To display this writeup, export it from Notion as HTML and place it at:
              </p>
              <code className={styles.filePath}>public/writeups/{writeup?.file}</code>
              <p className={styles.hint}>
                In Notion: Export → HTML → upload to your <code>public/writeups/</code> folder and rebuild.
              </p>
            </div>
          )}

          {status === 'found' && content && (
            <div
              className={styles.notionContent}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
