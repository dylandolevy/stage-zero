// app/layout.jsx
import './globals.css'
import Link from 'next/link'
import { Manrope } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400','500','600','700','800'],
})

export const metadata = {
  title: 'stage:zero',
  description: 'A student-run idol group agency at Duke University — auditions, members, events, contact.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <header className="site-header brandy-header">
          <div className="container header-inner">
            <Link href="/" className="brand">
              <span className="brand-title">
              <span className="brand-accent">stage</span>
              <span className="brand-main">:</span>
              <span className="brand-main">:zero</span>
            </span>
              <small className="brand-tag">idols at duke</small>
            </Link>

            <nav className="nav" aria-label="Primary">
              <Link href="/#about" className="nav-link">About</Link>
              <Link href="/roles" className="nav-link">Roles</Link>
              <Link href="/auditions" className="nav-link">Auditions</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
            </nav>
          </div>
        </header>

        <main className="container">{children}</main>

        <footer className="site-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} stage:zero</p>
            <p><small>Contact: <Link href="/contact">Contact form</Link></small></p>
          </div>
        </footer>

        <SpeedInsights />
      </body>
    </html>
  )
}