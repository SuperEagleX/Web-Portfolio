import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const SKILLS = [
  'Penetration Testing', 'CTF', 'Web Security', 'Reverse Engineering',
  'Cryptography', 'OSINT', 'Binary Exploitation', 'Forensics',
  'Linux', 'Python', 'Go', 'Bash'
]

const RECENT = [
  { slug: 'picoctf-2024-buffer-overflow', title: 'picoCTF 2024 — Buffer Overflow 3', tags: ['pwn', 'binary'], date: '2024-03-18', event: 'picoCTF' },
  { slug: 'htb-lame', title: 'HTB: Lame — Classic Samba Exploit', tags: ['linux', 'metasploit'], date: '2024-02-10', event: 'HackTheBox' },
  { slug: 'angstromctf-crypto', title: 'ångstromCTF — Crypto Cluster', tags: ['crypto', 'rsa'], date: '2024-04-05', event: 'ångstromCTF' },
]

export default function Home() {
  return (
    <div className={`${styles.page} page-enter`}>
      {/* ── Hero ─────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>
            <span className={styles.dot}></span>
            available for hire
          </div>

          <div className={styles.heroText}>
            <div className={styles.prompt}>
              <span className={styles.promptUser}>you@portfolio</span>
              <span className={styles.promptSep}>:</span>
              <span className={styles.promptPath}>~</span>
              <span className={styles.promptDollar}>$</span>
              <span className={styles.promptCmd}> whoami</span>
            </div>

            <h1 className={styles.heroTitle}>
              Security Researcher<br />
              <span className={styles.heroAccent}>&amp; CTF Player</span>
            </h1>

            <p className={styles.heroDesc}>
              Breaking things to understand them. I document my journey through CTFs, 
              bug bounties, and security research. Currently ranked in the top 500 on HTB.
            </p>

            <div className={styles.heroActions}>
              <Link to="/writeups" className={styles.btnPrimary}>
                Read writeups →
              </Link>
              <Link to="/projects" className={styles.btnSecondary}>
                View projects
              </Link>
            </div>
          </div>

          <div className={styles.heroCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardDot} style={{background:'#ff5f57'}}></span>
              <span className={styles.cardDot} style={{background:'#ffbd2e'}}></span>
              <span className={styles.cardDot} style={{background:'#28ca41'}}></span>
              <span className={styles.cardTitle}>terminal</span>
            </div>
            <div className={styles.cardBody}>
              <p><span className={styles.cGreen}>➜</span> <span className={styles.cBlue}>~</span> cat about.txt</p>
              <p className={styles.cMuted}>───────────────────</p>
              <p>🎓 CS Student @ University</p>
              <p>🏆 CTF Addict since 2021</p>
              <p>🔐 Bug Bounty Hunter</p>
              <p>📍 Based in Colombo, Sri Lanka</p>
              <p className={styles.cMuted}>───────────────────</p>
              <p><span className={styles.cGreen}>➜</span> <span className={styles.cBlue}>~</span> ls skills/</p>
              <div className={styles.skillGrid}>
                {SKILLS.map(s => (
                  <span key={s} className={styles.skill}>{s}</span>
                ))}
              </div>
              <p className={styles.cursor}><span className={styles.cGreen}>➜</span> <span className={styles.cBlue}>~</span> <span className={styles.blink}>▋</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────── */}
      <section className={styles.stats}>
        <div className={styles.statsInner}>
          {[
            { n: '50+', label: 'CTF Writeups' },
            { n: 'Top 500', label: 'HTB Ranking' },
            { n: '12+', label: 'Platforms' },
            { n: '8+', label: 'Cheatsheets' },
          ].map(({ n, label }) => (
            <div key={label} className={styles.stat}>
              <span className={styles.statN}>{n}</span>
              <span className={styles.statL}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Recent writeups ───────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.titleAccent}>//</span> Recent writeups
            </h2>
            <Link to="/writeups" className={styles.viewAll}>view all →</Link>
          </div>

          <div className={styles.writeupList}>
            {RECENT.map((w, i) => (
              <Link key={w.slug} to={`/writeups/${w.slug}`} className={styles.writeupCard}
                style={{ animationDelay: `${i * 60}ms` }}>
                <div className={styles.wcLeft}>
                  <span className={styles.wcEvent}>{w.event}</span>
                  <h3 className={styles.wcTitle}>{w.title}</h3>
                  <div className={styles.wcTags}>
                    {w.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                <div className={styles.wcRight}>
                  <span className={styles.wcDate}>{w.date}</span>
                  <span className={styles.wcArrow}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────── */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <p className={styles.ctaCode}><span className={styles.cGreen}>$</span> contact --message "Let's work together"</p>
          <h2 className={styles.ctaTitle}>Have a project in mind?</h2>
          <p className={styles.ctaDesc}>I'm open to internships, freelance security audits, and collaborations.</p>
          <Link to="/contact" className={styles.btnPrimary}>Get in touch →</Link>
        </div>
      </section>
    </div>
  )
}
