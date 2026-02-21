import './globals.css'
import Script from 'next/script'
import localFont from 'next/font/local'

export const metadata = {
  title: 'Gentleminati | Coming Soon',
  description: 'Qualcosa di grande sta arrivando',
}

const gentleminati = localFont({
  src: [
    {
      path: './fonts/gentleminati-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/gentleminati-bold.woff2',
      weight: '700',
      style: 'normal', // ✅ FIX
    },
  ],
  variable: '--font-gentleminati',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body className={`${gentleminati.variable} font-gentle`}>{children}</body>
    </html>
  )
}
