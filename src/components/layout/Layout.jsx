import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Layout.module.css'

const NAV_LINKS = [
  { to: '/', label: 'home', exact: true },
  { to: '/writeups', label: 'writeups' },
  { to: '/cheatsheets', label: 'cheatsheets' },
  { to: '/projects', label: 'projects' },
  { to: '/contact', label: 'contact' },
]

export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <div className={styles.root}>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navInner}>
          <NavLink to="/" className={styles.logo}>
            <span className={styles.logoBracket}>&lt;</span>
            <span className={styles.logoName}>yourname</span>
            <span className={styles.logoBracket}>/&gt;</span>
          </NavLink>

          <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
            {NAV_LINKS.map(({ to, label, exact }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={exact}
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ''}`
                  }
                >
                  <span className={styles.linkPrompt}>~/</span>{label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen ? styles.barOpen : ''}></span>
            <span className={menuOpen ? styles.barOpen : ''}></span>
            <span className={menuOpen ? styles.barOpen : ''}></span>
          </button>
        </div>
      </nav>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.mono}>$ built with ❤️ &amp; caffeine</span>
          <span className={styles.footerLinks}>
            <a href="https://github.com" target="_blank" rel="noreferrer">github</a>
            <span>·</span>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">twitter</a>
            <span>·</span>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">linkedin</a>
          </span>
        </div>
      </footer>
    </div>
  )
}
