import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SDE Drill | Full-Stack & AI Interview Revision Portal',
  description:
    'Targeted full-stack SDE and AI Application Engineer interview drill with local revision tracking, 30-90s pitch answers, and resume companion.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-[#323437] text-[#d1d0c5]">
      <body className="min-h-screen bg-[#323437] text-[#d1d0c5] antialiased selection:bg-[#e2b714] selection:text-[#1e2022]">
        {children}
      </body>
    </html>
  );
}
