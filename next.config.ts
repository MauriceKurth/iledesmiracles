import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration pour l'export statique
  output: 'export',
  
  // Désactive la génération d'images optimisées (incompatible avec l'export statique)
  images: {
    unoptimized: true
  },
  
  // Désactive le trailing slash pour éviter les problèmes de routage
  trailingSlash: true,
  
  // Optionnel : préfixe pour les assets si vous déployez dans un sous-dossier
  // basePath: '/mon-app',
  // assetPrefix: '/mon-app',
};

export default nextConfig;