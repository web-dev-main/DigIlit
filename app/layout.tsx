import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DigLit — AI for Modern Learning',
  description:
    'Quantum-inspired AI platform for creative generation and multimodal content synthesis.',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  themeColor: '#0b1220',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <div className="brand">DigLit</div>
            <nav className="nav">
              <a href="#features">Features</a>
              <a href="#cta">Get Started</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} DigLit. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
