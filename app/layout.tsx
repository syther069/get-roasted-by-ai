import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Get Roasted by AI",
  description:
    "Consensus achieved. Ego destroyed.",
  keywords: [
    "AI Roast",
    "GenLayer",
    "Consensus",
    "Web3",
    "AI Validators",
    "Roast Generator"
  ],

  openGraph: {
    title: "Get Roasted by AI",
    description:
      "Consensus achieved. Ego destroyed.",
    siteName: "Get Roasted by AI",
    type: "website"
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="bg-black text-white antialiased selection:bg-white selection:text-black">

        {/* NOISE OVERLAY */}
        <div className="pointer-events-none fixed inset-0 opacity-[0.03]">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* MAIN APP */}
        <main className="relative min-h-screen overflow-hidden">
          {children}
        </main>

      </body>
    </html>
  )
}