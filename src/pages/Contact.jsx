import { useState } from 'react'
import styles from './Contact.module.css'

const SOCIALS = [
  {
    label: 'GitHub',
    handle: '@yourhandle',
    href: 'https://github.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
    color: '#24292f',
  },
  {
    label: 'LinkedIn',
    handle: 'your-name',
    href: 'https://linkedin.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    color: '#0a66c2',
  },
  {
    label: 'Twitter / X',
    handle: '@yourhandle',
    href: 'https://twitter.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    color: '#000',
  },
  {
    label: 'HackTheBox',
    handle: 'yourhandle',
    href: 'https://hackthebox.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
        <line x1="12" y1="22" x2="12" y2="15.5"/>
        <polyline points="22 8.5 12 15.5 2 8.5"/>
      </svg>
    ),
    color: '#9fef00',
    colorBg: '#111',
  },
  {
    label: 'CTFtime',
    handle: 'yourteam',
    href: 'https://ctftime.org',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    color: '#e84545',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate — replace with your preferred form API (Formspree, EmailJS, etc.)
    await new Promise(r => setTimeout(r, 1200))
    setStatus('sent')
  }

  return (
    <div className={`${styles.page} page-enter`}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <div className={styles.breadcrumb}>
            <span className="mono">~/contact</span>
          </div>
          <h1 className={styles.pageTitle}>Get in touch</h1>
          <p className={styles.pageDesc}>
            Open to internships, freelance security audits, CTF collaborations, and just chatting about security.
          </p>
        </div>

        <div className={styles.layout}>
          {/* Left — socials */}
          <aside className={styles.aside}>
            <div className={styles.asideCard}>
              <div className={styles.asideTerminal}>
                <div className={styles.termBar}>
                  <span className={styles.dot} style={{background:'#ff5f57'}}></span>
                  <span className={styles.dot} style={{background:'#ffbd2e'}}></span>
                  <span className={styles.dot} style={{background:'#28ca41'}}></span>
                </div>
                <div className={styles.termBody}>
                  <p><span className={styles.g}>$</span> contact --list-socials</p>
                  <div className={styles.socials}>
                    {SOCIALS.map(s => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.social}
                      >
                        <span className={styles.socialIcon}
                          style={s.colorBg ? { background: s.colorBg, color: s.color } : { color: s.color }}>
                          {s.icon}
                        </span>
                        <div className={styles.socialText}>
                          <span className={styles.socialLabel}>{s.label}</span>
                          <span className={styles.socialHandle}>{s.handle}</span>
                        </div>
                        <span className={styles.socialArrow}>→</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.pgp}>
                <div className={styles.pgpHeader}>
                  <span>🔐</span>
                  <span className={styles.pgpTitle}>PGP Key</span>
                </div>
                <code className={styles.pgpKey}>
                  4B3A 9C1E 8D2F 7A6B<br />
                  5C4D 3E2F 1A0B 9C8D<br />
                  7E6F 5A4B 3C2D 1E0F
                </code>
                <button
                  className={styles.pgpCopy}
                  onClick={() => navigator.clipboard.writeText('your-pgp-key-here')}
                >
                  Copy fingerprint
                </button>
              </div>
            </div>
          </aside>

          {/* Right — form */}
          <div className={styles.formWrap}>
            {status === 'sent' ? (
              <div className={styles.sent}>
                <div className={styles.sentIcon}>✓</div>
                <h3>Message sent!</h3>
                <p>I'll get back to you within 24 hours.</p>
                <button onClick={() => { setForm({ name: '', email: '', subject: '', message: '' }); setStatus('idle') }}>
                  Send another
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Name</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input
                      className={styles.input}
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Subject</label>
                  <div className={styles.subjectPills}>
                    {['Internship', 'Bug Bounty', 'CTF Team', 'Just saying hi', 'Other'].map(s => (
                      <button
                        key={s}
                        type="button"
                        className={`${styles.pill} ${form.subject === s ? styles.pillActive : ''}`}
                        onClick={() => setForm(f => ({ ...f, subject: s }))}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <input
                    className={styles.input}
                    type="text"
                    name="subject"
                    placeholder="Or type your own..."
                    value={form.subject}
                    onChange={handleChange}
                    style={{ marginTop: 8 }}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Message</label>
                  <textarea
                    className={styles.textarea}
                    name="message"
                    placeholder="Hey! I'd love to discuss..."
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    required
                  />
                </div>

                <button
                  className={styles.submit}
                  type="submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <span className={styles.spinner}></span>
                      Sending…
                    </>
                  ) : (
                    '$ send --message →'
                  )}
                </button>

                <p className={styles.formNote}>
                  Or email me directly at{' '}
                  <a href="mailto:you@example.com">you@example.com</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
