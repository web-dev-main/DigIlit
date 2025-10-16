import './globals.css';

export const metadata = {
  title: 'DigLit — AI-Driven Enterprise Studio',
  description:
    'Dream. Define. Design. Deploy. Delegate. AI-driven enterprise & automation studio.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
        {children}
      </body>
    </html>
  );
}
