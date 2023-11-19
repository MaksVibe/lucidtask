import type { Metadata } from 'next';

import './page.css';
import './reset.css';

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
