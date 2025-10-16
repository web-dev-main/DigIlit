export const metadata = {
  title: 'Dig|lit - Quantum Enterprise',
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
EOF