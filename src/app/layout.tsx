import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SyV Solutions — Diseño Web, Branding e IA en Bogotá",
  description: "Agencia de diseño web y desarrollo con IA. Creamos sitios premium, identidad de marca y automatización para empresas en Bogotá y Latinoamérica.",
  keywords: ["diseño web Bogotá", "desarrollo web", "branding empresarial", "tiendas online", "IA"],
  robots: "index, follow",
  openGraph: {
    title: "SyV Solutions — Agencia de Diseño Web y Desarrollo",
    description: "Creamos sitios web, branding y soluciones con IA para empresas.",
    url: "https://www.syvsolutions.com",
    siteName: "SyV Solutions",
    images: [
      {
        url: "https://www.syvsolutions.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SyV Solutions",
    description: "Diseño web, branding e IA en Bogotá",
  },
  authors: [{ name: "SyV Solutions" }],
  alternates: {
    canonical: "https://www.syvsolutions.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SyV Solutions",
              "url": "https://www.syvsolutions.com",
              "logo": "https://www.syvsolutions.com/logo.svg",
              "description": "Agencia de diseño web y desarrollo con IA en Bogotá",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bogotá",
                "addressCountry": "CO",
                "addressLocality": "Bogotá",
                "addressRegion": "Bogotá D.C."
              },
              "contact": {
                "@type": "ContactPoint",
                "telephone": "+57 3102163947",
                "contactType": "Customer Service",
                "email": "contacto@syvsolutions.com"
              },
              "sameAs": [
                "https://instagram.com/syv.solutions",
                "https://linkedin.com/company/syvsolutions"
              ],
              "service": [
                {
                  "@type": "LocalBusiness",
                  "name": "Diseño Web Profesional",
                  "description": "Sitios web modernos optimizados para SEO y conversión",
                  "areaServed": {
                    "@type": "Country",
                    "name": "CO"
                  }
                },
                {
                  "@type": "LocalBusiness",
                  "name": "Branding Empresarial",
                  "description": "Identidad visual completa para marcas"
                },
                {
                  "@type": "LocalBusiness",
                  "name": "E-commerce",
                  "description": "Tiendas online con integración de pagos"
                },
                {
                  "@type": "LocalBusiness",
                  "name": "Automatización de Procesos",
                  "description": "APIs y workflows para automatizar tu negocio"
                }
              ]
            })
          }}
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
