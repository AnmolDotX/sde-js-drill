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
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('sde_drill_theme_v1') || 'dark';
                document.documentElement.classList.remove('dark', 'light');
                document.documentElement.classList.add(savedTheme);
                document.documentElement.setAttribute('data-theme', savedTheme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] antialiased selection:bg-[var(--accent)] selection:text-neutral-950 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
