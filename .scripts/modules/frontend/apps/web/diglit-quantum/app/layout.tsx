export const metadata = {
  title: 'DigLit - AI-Driven Enterprise Studio',
  description: 'Dream. Define. Design. Deploy. Delegate. AI-driven enterprise & automation studio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
