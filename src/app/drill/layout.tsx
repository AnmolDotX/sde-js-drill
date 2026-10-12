import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice Dashboard & Technical Stepper",
  description:
    "Interactive step-by-step revision portal for Full-Stack JavaScript, TypeScript, Node.js, and AI Engineering interviews. Rehearse 30-90s pitch answers, study code blueprints, and track local progress.",
  keywords: [
    "javascript interview drill",
    "fullstack interview revision dashboard",
    "node js system design drill",
    "react 19 interview pitch answers",
    "p0 must know technical interview questions",
  ],
  alternates: {
    canonical: "https://sde-js-drill.babacreates.in/drill",
  },
  openGraph: {
    title: "SDE Drill Dashboard | Senior Technical Revision Engine",
    description:
      "Practice 58+ senior full-stack interview questions across Frontend, Node.js, CS Core, and AI Engineering with mental models and 30-90s pitch answers.",
    url: "https://sde-js-drill.babacreates.in/drill",
    siteName: "SDE Drill",
    type: "website",
  },
};

export default function DrillLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
