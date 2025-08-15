import "./globals.css";

export const metadata = {
  title: "L'Île des Miracles",
  description: "Découvrez les charmants visiteurs de vos boutiques magiques",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
