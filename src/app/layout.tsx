import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'title',
  description: 'description',
};

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
