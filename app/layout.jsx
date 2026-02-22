import './globals.css'
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
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <a href="/" className="brand">stage:zero</a>
            <nav className="nav">
              <a href="/#about">About</a>
              <a href="/auditions">Auditions</a>
              <a href="/contact">Contact</a>
              <a href="/admin">Admin</a>
            </nav>
          </div>
        </header>

        <main className="container">{children}</main>

        <footer className="site-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} stage:zero</p>
            <p><small>Contact: <a href="/contact">Contact form</a></small></p>
          </div>
        </footer>
      </body>
    </html>
  )
}
