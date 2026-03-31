import styles from './Projects.module.css'

const PROJECTS = [
  {
    id: 'ctf-platform',
    title: 'CTF Practice Platform',
    status: 'live',
    year: '2024',
    tags: ['python', 'docker', 'flask', 'ctf'],
    desc: 'A self-hosted CTF platform with 40+ custom challenges spanning web, pwn, crypto, and forensics. Includes a scoreboard, hints system, and automated flag validation.',
    links: { github: 'https://github.com', demo: 'https://example.com' },
    highlight: 'Used by 200+ participants in a local university CTF event.',
    icon: '🏆',
  },
  {
    id: 'vuln-scanner',
    title: 'Web Vulnerability Scanner',
    status: 'wip',
    year: '2024',
    tags: ['python', 'asyncio', 'security'],
    desc: 'Async Python scanner that detects common web vulnerabilities: open redirects, IDOR, missing security headers, XSS vectors, and basic SQLi. Generates structured JSON reports.',
    links: { github: 'https://github.com' },
    highlight: 'Scans 1000 URLs/min on a single thread using asyncio.',
    icon: '🔍',
  },
  {
    id: 'payload-forge',
    title: 'PayloadForge',
    status: 'live',
    year: '2023',
    tags: ['javascript', 'react', 'security'],
    desc: 'Web-based payload encoder/decoder and generator for pentesters. Supports XSS, SQLi, command injection, and encoding chains (URL → Base64 → HTML entity).',
    links: { github: 'https://github.com', demo: 'https://example.com' },
    highlight: 'Listed in HackTheBox\'s recommended tools wiki.',
    icon: '⚡',
  },
  {
    id: 'ctf-bot',
    title: 'Discord CTF Bot',
    status: 'live',
    year: '2023',
    tags: ['python', 'discord.py', 'automation'],
    desc: 'A Discord bot for CTF teams: creates per-challenge threads, tracks solve status, integrates with CTFTime for event reminders, and posts writeup links automatically.',
    links: { github: 'https://github.com' },
    highlight: 'Running in 15+ CTF team servers.',
    icon: '🤖',
  },
  {
    id: 'binary-analysis',
    title: 'Binary Analysis Toolkit',
    status: 'archived',
    year: '2022',
    tags: ['python', 'pwntools', 'binary'],
    desc: 'Collection of scripts for binary exploitation: automated ROP chain generation, function signature detection, and format string offset finder.',
    links: { github: 'https://github.com' },
    highlight: 'Helped solve 12 pwn challenges at DEFCON CTF Quals.',
    icon: '🔧',
  },
  {
    id: 'osint-dashboard',
    title: 'OSINT Dashboard',
    status: 'wip',
    year: '2024',
    tags: ['go', 'react', 'osint'],
    desc: 'Aggregates OSINT data from Shodan, Censys, VirusTotal, and WHOIS into a unified dashboard. Supports bulk domain/IP lookups with export to JSON/CSV.',
    links: { github: 'https://github.com' },
    highlight: 'WIP — core API integrations complete, UI in progress.',
    icon: '📊',
  },
]

const STATUS_CONFIG = {
  live:     { label: 'Live',     bg: 'var(--green-light)',  color: 'var(--green)',  border: '#bbf7d0' },
  wip:      { label: 'WIP',      bg: 'var(--amber-light)', color: 'var(--amber)',  border: '#fde68a' },
  archived: { label: 'Archived', bg: 'var(--surface)',      color: 'var(--text-muted)', border: 'var(--border)' },
}

export default function Projects() {
  return (
    <div className={`${styles.page} page-enter`}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <div className={styles.breadcrumb}>
            <span className="mono">~/projects</span>
          </div>
          <h1 className={styles.pageTitle}>Projects</h1>
          <p className={styles.pageDesc}>
            Tools, platforms, and experiments built for security research, CTF competitions, and automation.
          </p>
        </div>

        {/* Status legend */}
        <div className={styles.legend}>
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
            <span key={key} className={styles.legendItem}
              style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.border }}>
              {key === 'live' && <span className={styles.liveDot}></span>}
              {cfg.label}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {PROJECTS.map((p, i) => {
            const s = STATUS_CONFIG[p.status]
            return (
              <div key={p.id} className={styles.card} style={{ animationDelay: `${i * 50}ms` }}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon}>{p.icon}</span>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardYear}>{p.year}</span>
                    <span className={styles.cardStatus}
                      style={{ background: s.bg, color: s.color, borderColor: s.border }}>
                      {p.status === 'live' && <span className={styles.liveDot}></span>}
                      {s.label}
                    </span>
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.desc}</p>

                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>★</span>
                  {p.highlight}
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.cardTags}>
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div className={styles.cardLinks}>
                    {p.links.github && (
                      <a href={p.links.github} target="_blank" rel="noreferrer" className={styles.link}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                        GitHub
                      </a>
                    )}
                    {p.links.demo && (
                      <a href={p.links.demo} target="_blank" rel="noreferrer" className={`${styles.link} ${styles.linkDemo}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        Live demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
